import { increment } from "./computeLab.ts";
import { getSimpleAdders, getDoubleAdders, setSimpleAdders, setDoubleAdders } from './savefile.ts';

let _simpleAdderInterval: number | null = null;
let _simpleAdders: number = 0;

let _doubleAdderInterval: number | null = null;
let _doubleAdders: number = 0;

const _SIMPLE_ADDER_BASE: number = 1000;
const _DOUBLE_ADDER_BASE: number = 1000;

export const initAdders = (): void => {
	_simpleAdders = getSimpleAdders() ?? 0;
	_doubleAdders = getDoubleAdders() ?? 0;
}

export const simpleAdderLoop = (): void => {
	if (_simpleAdderInterval) {
		clearInterval(_simpleAdderInterval);
		_simpleAdderInterval = null;
	}

	if (_simpleAdders <= 0) return;

	const delay: number = _SIMPLE_ADDER_BASE / _simpleAdders;

	_simpleAdderInterval = setInterval(() => {
		increment();
	}, delay);
};

export const doubleAdderLoop = (): void => {
	if (_doubleAdderInterval) {
		clearInterval(_doubleAdderInterval);
		_doubleAdderInterval = null;
	}

	if (_doubleAdders <= 0) return;

	const delay: number = _DOUBLE_ADDER_BASE / _doubleAdders;

	_doubleAdderInterval = setInterval(() => {
		console.log("looping");
		increment(2);
	}, delay);
};

export const addSimpleAdder = (count: number = 1): void => {
	_simpleAdders += count;
	setSimpleAdders(_simpleAdders);
	simpleAdderLoop();
};

export const addDoubleAdder = (count: number = 1): void => {
	_doubleAdders += count;
	setDoubleAdders(_doubleAdders);
	doubleAdderLoop();
};
