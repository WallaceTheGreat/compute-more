const listeners = new Set();
import inventory from '../data/inventory.json';

export const increment = (amount: number = 1): void => {
	let currentTotal: number = parseInt(String(inventory.total));
	currentTotal += amount;
	inventory.total = currentTotal;

	listeners.forEach(cb => cb(inventory.total));
}

export const getTotal = (): number => { return inventory.total; }

export const setTotal = (newTotal: number): void => { inventory.total = newTotal; }

export const onChange = (cb: any): any => {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
