import { CommandResult } from './types/command.ts';
import commands from '../data/commands.json';
import computeUnits from '../data/computeUnits.json';
import reservedNames from '../data/reserved_names.json';
import { getName, saveInventory, setName, saveFlags, clearSavefile } from './savefile.ts';
import { addComputeUnit, isComputeUnitType, ComputeUnitError } from './computeEconomy.ts';
import { EVENTS, myDispatchEvent } from './core/events.ts';

export const cmdOut = (output: string | string[], clear: boolean = false) => ({
	output: Array.isArray(output) ? output : [output],
	clear
});

export const handleCmd = (cmdText: string): CommandResult => {
	const [cmd, ...args] = cmdText.trim().split(' ');
	const command = commands.find(c => c.name === cmd);

	if (!command) return cmdOut(`Unknown command: ${cmdText}`);

	switch (command.name) {
		case 'help': {
			return {
				output: [
					'Available commands:',
					...commands.map(c => `${c.name.toUpperCase()} - ${c.description}`)
				],
				clear: false
			};
		}
		case 'clear': {
			return { output: [], clear: true };
		}
		case 'run': {
			return { output: ['Who are you running from ?'], clear: true };
		}
		case 'add': {
			const unitName = args[0];
			const unitCount = args[1] ? Number(args[1]) : 1;

			if (!unitName || unitName === "help") {
				return {
					output: [
						`Compute units available:`,
						...computeUnits.map(cu => `"${cu.name}" - ${cu.description}`)
					],
					clear: false
				};
			}

			if (!Number.isInteger(unitCount) || unitCount <= 0) {
				return {
					output: [`Invalid count "${unitCount}"`],
					clear: false
				};
			}

			const result = isComputeUnitType(unitName)
				? addComputeUnit(unitName, unitCount)
				: ComputeUnitError.NOT_FOUND;

			switch (result) {
				case ComputeUnitError.OK:
					myDispatchEvent(EVENTS.UPDATE_COUNT);
					return {
						output: [`Added "${unitName}" x${unitCount}`],
						clear: false
					};

				case ComputeUnitError.NOT_AFFORDABLE:
					return {
						output: [`Not enough resources to add "${unitName}" x${unitCount}`],
						clear: false
					};

				case ComputeUnitError.NOT_FOUND:
					return {
						output: [`Nothing called "${unitName}"`],
						clear: false
					};

				default:
					return {
						output: [`Unknown error while adding "${unitName}"`],
						clear: false
					};
			}
		}
		case 'name': {
			if (!args[0]) {
				return { output: ['No name was entered'], clear: false };
			}

			const name: string = args[0];
			const DEFAULT_MSG = `Greetings, employee ${name}`;
			let output: string = "";

			const reservedEntry = reservedNames
				.find(entry => entry.name.toLowerCase() === args[0].toLowerCase()
				);

			if (reservedEntry) {
				const { allow, hide_default, hide_employee, custom_message } = reservedEntry;

				if (!allow) {
					return {
						output: [custom_message],
						clear: false
					}
				}

				if (!hide_default) {
					const label = hide_employee ? name : `employee ${name}`;
					output = `Greetings, ${label}.`;
				}

				if (custom_message?.trim()) {
					output = output ? `${output} ${custom_message}` : custom_message;
				}

				if (!output) {
					output = DEFAULT_MSG;
				}
			} else {
				output = DEFAULT_MSG;
			}

			const isSet: boolean = setName(name);

			if (!isSet) {
				const foundName = getName();
				const reservedFoundName = reservedNames
					.find(entry => entry.name.toLowerCase() === foundName.toLowerCase()
					);

				const employeeLabel: string = reservedFoundName?.hide_employee
					? `${foundName}`
					: `employee ${foundName}`;

				return {
					output: [`You've already told us your name, ${employeeLabel}.`],
					clear: false
				};
			}

			myDispatchEvent(EVENTS.UPDATE_PROMPT, { name });

			return { output: [output], clear: false };
		}
		case 'save': {
			saveInventory();
			saveFlags();
			return { output: ['Saved the game'], clear: false };
		}
		case 'reset': {
			clearSavefile();

			myDispatchEvent(EVENTS.UPDATE_PROMPT);
			myDispatchEvent(EVENTS.UPDATE_COUNT);

			return { output: ['Save file cleared'], clear: true };
		}
		default: {
			return { output: [`Unknown command: ${cmd}`], clear: false };
		}
	}
};
