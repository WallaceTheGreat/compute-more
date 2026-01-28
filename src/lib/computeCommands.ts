import { CommandResult } from './types/command.ts';
import commands from '../data/commands.json';
import computeUnits from '../data/computeUnits.json';
import reservedNames from '../data/reserved_names.json';
import { getName, saveInventory, setName, saveFlags, clearSavefile } from './savefile.ts';
import { addDoubleAdder, addSimpleAdder } from './computeEconomy.ts';
import { EVENTS } from './core/events.ts';

const handleAddCmd = (adderName: string, count: number): void => {
	switch (adderName) {
		case 'simple_adder':
			addSimpleAdder(count);
			break;
		case 'double_adder':
			addDoubleAdder(count);
			break;
	}
};

export const handleCmd = (cmdText: string): CommandResult => {
	const [cmd, ...args] = cmdText.trim().split(' ');
	const command = commands.find(c => c.name === cmd);

	if (!command) return { output: [`Unknown command: ${cmdText}`] };

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
			if (!args[0] || args[0] === "help") {
				return {
					output: [
						`Compute units available:`,
						...computeUnits.map(cu => `"${cu.name}" - ${cu.description}`)
					],
					clear: false
				};
			}

			const adder = computeUnits.find(unit => args.includes(unit.name));
			if (!adder) {
				return { output: [`Nothing called "${args}"`], clear: false };
			}

			let count = 1;
			if (args[1]) count = parseInt(args[1]);

			handleAddCmd(adder.name, count);

			return { output: [`Added "${adder.name}" x${count}`], clear: false };
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

			document.dispatchEvent(
				new CustomEvent(EVENTS.UPDATE_PROMPT, { detail: { name } })
			);

			return { output: [output], clear: false };
		}
		case 'save': {
			saveInventory();
			saveFlags();
			return { output: ['Saved the game'], clear: false };
		}
		case 'reset': {
			clearSavefile();
			return { output: ['Save file cleared'], clear: true };
		}
		default: {
			return { output: [`Unknown command: ${cmd}`], clear: false };
		}
	}
};
