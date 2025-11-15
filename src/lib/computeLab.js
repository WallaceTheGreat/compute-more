const listeners = new Set();
import inventory from '../data/inventory.json';

export function increment(amount = 1) {
	let currentTotal = parseInt(inventory.total);
	currentTotal += amount;
	inventory.total = currentTotal;

	listeners.forEach(cb => cb(inventory.total));
}

export function getTotal() {
	return inventory.total;
}

export function setTotal(newTotal) {
	inventory.total = newTotal;
	console.log("I read total as ", inventory.total)
}

export function getCurrentInventory() {
	return inventory;
}

export function onChange(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
