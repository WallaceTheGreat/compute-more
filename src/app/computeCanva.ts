import { onChange, getTotal } from '../lib/computeLab.ts';
import { loadTotal } from '../lib/savefile.ts';
import { doubleAdderLoop, simpleAdderLoop } from '../lib/computeLoops.ts';

export const initComputeCanva = (): void => {
	const h1 = document.getElementById('compute-total');

	console.log(h1);
	loadTotal();

	if (h1) {
		h1.textContent = getTotal().toString();
	}

	onChange((newTotal: string) => {
		if (h1) {
			h1.textContent = newTotal;
		}
	});

	simpleAdderLoop();
	doubleAdderLoop();
};
