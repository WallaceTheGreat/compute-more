import defaultInventory from '../data/inventory.json';
import defaultFlags from '../data/flags.json';
import { simpleAdderLoop, doubleAdderLoop } from './computeLoops.ts';

type Inventory = typeof defaultInventory;
type Flags = typeof defaultFlags;

let _inventory: Inventory = { ...defaultInventory };
let _flags: Flags = { ...defaultFlags };

export const loadInventory = (): void => {
	const savedInv: string | null = localStorage.getItem("inv");
	if (savedInv) {
		try {
			_inventory = JSON.parse(savedInv);
		} catch (e) {
			_inventory = { ...defaultInventory };
		}
	}
}

export const saveInventory = (): void => {
	const invToSave: string = JSON.stringify(_inventory);
	localStorage.setItem("inv", invToSave);
};

export const loadFlags = (): void => {
	const savedFlags: string | null = localStorage.getItem("flags");
	if (savedFlags) {
		try {
			_flags = JSON.parse(savedFlags);
		} catch (e) {
			_flags = { ...defaultInventory };
		}
	}
}

export const saveFlags = (): void => {
	const flagsToSave: string = JSON.stringify(_flags);
	localStorage.setItem("flags", flagsToSave);
};

export const clearSavefile = () => {
	localStorage.clear();
	_inventory = { ...defaultInventory };
	_flags = { ...defaultFlags };

	simpleAdderLoop();
	doubleAdderLoop();
}

export const getName = (): string => {
	console.log("name:", _inventory.employee);
	return _inventory.employee;
};

export const setName = (newName: string): boolean => {
	if (_flags.name_set) {
		_flags.name_reset_attempt++;
		return false;
	}

	if (newName.length > 15) {
		newName = newName.substring(0, 15);
	}

	_inventory.employee = newName;
	_flags.name_set = true;

	return true;
};

export const getTotal = (): number => { return _inventory.total; }

export const setTotal = (newTotal: number): void => { _inventory.total = newTotal; }

export const getSimpleAdders = (): number => { return _inventory.simple_adder ?? 0; }

export const setSimpleAdders = (newCount: number): void => { _inventory.simple_adder = newCount; }

export const getDoubleAdders = (): number => { return _inventory.double_adder ?? 0; }

export const setDoubleAdders = (newCount: number): void => { _inventory.double_adder = newCount; }
