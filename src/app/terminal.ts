import { increment } from '../lib/computeLab.ts';
import { getName } from '../lib/savefile.ts';
import { handleCmd } from '../lib/computeCommands.ts';

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
