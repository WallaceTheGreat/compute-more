import { onChange, getTotal } from '../lib/computeLab.ts';
import { loadTotal } from '../lib/savefile.js';
import { doubleAdderLoop, simpleAdderLoop } from '../lib/computeLoops.js';

export function initComputeCanva() {
	const h1 = document.getElementById('compute-total');
	h1.textContent = getTotal();

	onChange((newTotal) => {
		h1.textContent = newTotal;
	});

	loadTotal();
	h1.textContent = getTotal();

	simpleAdderLoop();
	doubleAdderLoop();
}
