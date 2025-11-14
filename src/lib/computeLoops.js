import {increment} from "./computeLab.js";

let _simpleAdderInterval = null;
let _simpleAdders = 0;

const _SIMPLE_ADDER_BASE = 1000;

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
export function addSimpleAdder(count = 1) {
	_simpleAdders += count;
	console.log("adders count:", _simpleAdders, "cooldown:", _SIMPLE_ADDER_BASE / _simpleAdders);
	simpleAdderLoop();
}

