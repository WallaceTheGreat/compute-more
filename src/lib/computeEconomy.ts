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

export const ComputeUnitError = {
	OK: 0,
	NOT_FOUND: 1,
	NOT_AFFORDABLE: 2,
} as const;

export type ComputeUnitType = typeof ComputeUnitType[keyof typeof ComputeUnitType];
export type ComputeUnitError = typeof ComputeUnitError[keyof typeof ComputeUnitError];

export const initAdders = (): void => {
	_simpleAdders = getSimpleAdders();
	_doubleAdders = getDoubleAdders();
}

export const isComputeUnitType = (value: string): value is ComputeUnitType => {
	return Object.values(ComputeUnitType).includes(value as ComputeUnitType);
};

export const addSimpleAdder = (count: number = 1): ComputeUnitError => {
	const adderPrice: number = getComputeUnitPrice(ComputeUnitType.SIMPLE_ADDER);

	if (adderPrice === -1) {
		console.log("adder not found");
		return ComputeUnitError.NOT_FOUND;
	}

	if (!substract(adderPrice * count)) {
		console.log("cant afford:", adderPrice * count);
		return ComputeUnitError.NOT_AFFORDABLE;
	}

	_simpleAdders += count;
	setSimpleAdders(_simpleAdders);
	simpleAdderLoop();

	return ComputeUnitError.OK;
};

export const addDoubleAdder = (count: number = 1): ComputeUnitError => {
	const adderPrice: number = getComputeUnitPrice(ComputeUnitType.DOUBLE_ADDER);

	if (adderPrice === -1) {
		console.log("adder not found");
		return ComputeUnitError.NOT_FOUND;
	}

	if (!substract(adderPrice * count)) {
		console.log("cant afford:", adderPrice * count);
		return ComputeUnitError.NOT_AFFORDABLE;
	}

	_doubleAdders += count;
	setDoubleAdders(_doubleAdders);
	doubleAdderLoop();

	return ComputeUnitError.OK;
};

export const addComputeUnit = (computeUnit: ComputeUnitType, count: number = 1): ComputeUnitError => {
	const adderPrice: number = getComputeUnitPrice(computeUnit);

	if (adderPrice === -1) {
		console.log("adder not found");
		return ComputeUnitError.NOT_FOUND;
	}

	if (!substract(adderPrice * count)) {
		console.log("cant afford:", adderPrice * count);
		return ComputeUnitError.NOT_AFFORDABLE;
	}

	switch (computeUnit) {
		case ComputeUnitType.SIMPLE_ADDER:
			_simpleAdders += count;
			setSimpleAdders(_simpleAdders);
			simpleAdderLoop();
			break;
		case ComputeUnitType.DOUBLE_ADDER:
			_doubleAdders += count;
			setDoubleAdders(_doubleAdders);
			doubleAdderLoop();
			break;
		case ComputeUnitType.CACHE:
			break;
		default:
			break;

	}

	return ComputeUnitError.OK;
};

const getComputeUnitPrice = (type: ComputeUnitType): number => {
	const unitFound = computeUnitsData.find(unit => unit.name === type);
	if (!unitFound)
		return -1;

	return unitFound.price;
}

