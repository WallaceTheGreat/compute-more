type Listener = (value: string) => void;

const listeners = new Set<Listener>();
import { getTotal, setTotal } from './savefile.ts';

export const increment = (amount: number = 1): void => {
	let currentTotal: number = getTotal();
	currentTotal += amount;
	setTotal(currentTotal);

	listeners.forEach(cb => cb(getTotal().toString()));
}

export const onChange = (cb: Listener): any => {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
