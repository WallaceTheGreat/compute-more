import { increment } from '../lib/computeLab.ts';
import { getName, saveInventory, setName, saveFlags } from '../lib/savefile.ts';
import { addDoubleAdder, addSimpleAdder } from '../lib/computeLoops.ts';
import commands from '../data/commands.json';
import computeUnits from '../data/computeUnits.json';
import { CommandResult } from '../lib/types/command.ts';

let _spaceKeyDown = false;

export const initTerminal = (): void => {
	const terminal = document.getElementById('terminal');
	const input = document.getElementById('terminal-in') as HTMLInputElement;
	const prompt = document.getElementById('prompt');
	const tuto = document.getElementById('tuto');

	const updatePrompt = (): void => {
		if (!prompt) return;

		const now = new Date();
		const hour = now.getHours().toString().padStart(2, '0');
		const minute = now.getMinutes().toString().padStart(2, '0');
		const name = getName();

		prompt.innerHTML = `
			${hour}:${minute} 
			<span class="username">${name}</span><span class="host">@compute-more</span> >`;
	};

	const addLine = (text: string, className = ''): void => {
		if (!terminal) return;

		const lineEl = document.createElement('p');
		lineEl.classList.add('terminal-line');
		if (className) lineEl.classList.add(className);
		lineEl.textContent = text;
		terminal.prepend(lineEl);
	};

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

	const handleCmd = (cmdText: string): CommandResult => {
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

				const isSet: boolean = setName(args[0]);
				updatePrompt();

				if (!isSet) {
					const foundName = getName();

					return { output: [`You've already told us your name, employee ${foundName}`], clear: false };
				}

				return { output: [`Greetings, employee ${args[0]}`], clear: false };
			}
			case 'save': {
				saveInventory();
				saveFlags();
				return { output: ['Saved the game'], clear: false };
			}
			default: {
				return { output: [`Unknown command: ${cmd}`], clear: false };
			}
		}
	};

	updatePrompt();
	setInterval(updatePrompt, 60 * 1000);

	if (input) {
		input.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				const line = input.value.trim();
				if (!line) return;

				if (tuto) tuto.remove();

				input.value = '';
				const result = handleCmd(line);
				if (result.clear && terminal) {
					terminal.innerHTML = '';
				}

				result.output.forEach(text => addLine(text));

				if (terminal) {
					const lines = terminal.querySelectorAll('.terminal-line');
					lines.forEach((el, i) => {
						let opa = 1 - i * 0.05;
						opa = opa >= 0.15 ? opa : 0.2;
						(el as HTMLElement).style.opacity = opa.toString();
					});
				}
			}
		});

		input.addEventListener('focus', () => {
			input.placeholder = "";
		});
	}

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			e.preventDefault();
			if (input) {
				input.placeholder = "press '/' to focus";
				input.blur();
			}
		}

		if (e.key === '/' && document.activeElement !== input) {
			e.preventDefault();
			if (input) input.focus();
		}

		if (e.key === ' ' && document.activeElement !== input && !_spaceKeyDown) {
			e.preventDefault();
			increment();
			_spaceKeyDown = true;
		}
	});

	document.addEventListener('keyup', (e) => {
		if (e.key === ' ') {
			_spaceKeyDown = false;
		}
	});
};
