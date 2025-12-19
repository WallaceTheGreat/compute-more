import { getSimpleAdders, getDoubleAdders, setSimpleAdders, setDoubleAdders } from './savefile.ts';
import { simpleAdderLoop, doubleAdderLoop } from './computeLoops.ts';

let _simpleAdders: number = 0;
let _doubleAdders: number = 0;

export const initAdders = (): void => {
	_simpleAdders = getSimpleAdders();
	_doubleAdders = getDoubleAdders();
}

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
