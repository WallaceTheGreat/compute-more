import { onChange } from '../lib/computeLab.ts';
import { getTotal } from '../lib/savefile.ts';
import { doubleAdderLoop, simpleAdderLoop } from '../lib/computeLoops.ts';
import { initAdders } from '../lib/computeEconomy.ts';

export const initComputeCanva = (): void => {
	const h1 = document.getElementById('compute-total');
	if (h1) {
		h1.textContent = getTotal().toString();
	}

	onChange((newTotal: string) => {
		if (h1) {
			h1.textContent = newTotal;
		}
	});

	initAdders();
	simpleAdderLoop();
	doubleAdderLoop();
};
