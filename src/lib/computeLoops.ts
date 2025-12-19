import { increment } from "./computeLab.ts";
import { getSimpleAdders, getDoubleAdders } from './savefile.ts';

let _simpleAdderInterval: number | null = null;
let _doubleAdderInterval: number | null = null;

const _SIMPLE_ADDER_BASE: number = 1000;
const _DOUBLE_ADDER_BASE: number = 1000;

export const simpleAdderLoop = (): void => {
	const simpleAdderCount: number = getSimpleAdders();

	console.log("simpleAdder", simpleAdderCount);

	if (_simpleAdderInterval) {
		clearInterval(_simpleAdderInterval);
		_simpleAdderInterval = null;
	}

	if (simpleAdderCount <= 0) return;

	const delay: number = _SIMPLE_ADDER_BASE / simpleAdderCount;

	console.log("simpleAdder delay", delay);

	_simpleAdderInterval = setInterval(() => {
		console.log("looping", delay, simpleAdderCount);
		increment();
	}, delay);
};

export const doubleAdderLoop = (): void => {
	const doubleAdderCount: number = getDoubleAdders();

	console.log("doubleAdder", doubleAdderCount);

	if (_doubleAdderInterval) {
		clearInterval(_doubleAdderInterval);
		_doubleAdderInterval = null;
	}

	if (doubleAdderCount <= 0) return;

	const delay: number = _DOUBLE_ADDER_BASE / doubleAdderCount;

	console.log("doubleAdder delay", delay);

	_doubleAdderInterval = setInterval(() => {
		console.log("looping", delay, doubleAdderCount);
		increment(2);
	}, delay);
};

