let total = 0;
const listeners = new Set();

export function increment(amount = 1) {
	total += amount;
	listeners.forEach(cb => cb(total));
}

export function getTotal() {
	return total;
}

export function onChange(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
