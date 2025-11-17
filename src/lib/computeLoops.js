import {increment} from "./computeLab.ts";

let _simpleAdderInterval = null;
let _simpleAdders = 0;

let _doubleAdderInterval = null;
let _doubleAdders = 0;

const _SIMPLE_ADDER_BASE = 1000;
const _DOUBLE_ADDER_BASE = 1000;

export function simpleAdderLoop() {
	if (_simpleAdderInterval)
	{
		clearInterval(_simpleAdderInterval);
		_simpleAdderInterval = null;
	}

	if (_simpleAdders <= 0) return;

	const delay = _SIMPLE_ADDER_BASE / _simpleAdders;

	_simpleAdderInterval = setInterval(() => {
		increment();
	}, delay);
}

export function doubleAdderLoop() {
	if (_doubleAdderInterval)
	{
		clearInterval(_doubleAdderInterval);
		_doubleAdderInterval = null;
	}

	if (_doubleAdders <= 0) return;

	const delay = _DOUBLE_ADDER_BASE / _doubleAdders;

	_doubleAdderInterval = setInterval(() => {
		console.log("looping");
		increment(2);
	}, delay);
}
export function addSimpleAdder(count = 1) {
	_simpleAdders += count;
	simpleAdderLoop();
}

export function addDoubleAdder(count = 1) {
	_doubleAdders += count;
	console.log("double adder count:", _doubleAdders);
	doubleAdderLoop();
}
