import { getSimpleAdders, getDoubleAdders, setSimpleAdders, setDoubleAdders } from './savefile.ts';
import { simpleAdderLoop, doubleAdderLoop } from './computeLoops.ts';
import { substract } from './computeLab.ts';
import computeUnitsData from '../data/computeUnits.json';

let _simpleAdders: number = 0;
let _doubleAdders: number = 0;

export const ComputeUnitType = {
	SIMPLE_ADDER: 'simple_adder',
	DOUBLE_ADDER: 'double_adder',
	CACHE: 'cache'
} as const;

export type ComputeUnitType = typeof ComputeUnitType[keyof typeof ComputeUnitType];

export const initAdders = (): void => {
	_simpleAdders = getSimpleAdders();
	_doubleAdders = getDoubleAdders();
}

export const addSimpleAdder = (count: number = 1): void => {
	const adderPrice: number = getComputeUnitPrice(ComputeUnitType.SIMPLE_ADDER);

	if (adderPrice === -1) {
		console.log("adder not found");
		return;
	}

	if (!substract(adderPrice * count)) {
		console.log("cant afford:", adderPrice * count);
		return;
	}

	_simpleAdders += count;
	setSimpleAdders(_simpleAdders);
	simpleAdderLoop();
};

export const addDoubleAdder = (count: number = 1): void => {
	const adderPrice: number = getComputeUnitPrice(ComputeUnitType.DOUBLE_ADDER);

	if (adderPrice === -1) {
		console.log("adder not found");
		return;
	}

	if (!substract(adderPrice * count)) {
		console.log("cant afford:", adderPrice * count);
		return;
	}

	_doubleAdders += count;
	setDoubleAdders(_doubleAdders);
	doubleAdderLoop();
};

const getComputeUnitPrice = (type: ComputeUnitType): number => {
	const unitFound = computeUnitsData.find(unit => unit.name === type);
	if (!unitFound)
		return -1;

	return unitFound.price;
}
