import defaultInventory from '../data/inventory.json';

type Inventory = typeof defaultInventory;

let _inventory: Inventory = { ...defaultInventory };

export const getCurrentInventory = (): typeof _inventory => {
	return _inventory;
};

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

export const getName = (): string => {
	console.log("name:", (_inventory as Inventory).employee);
	return (_inventory as Inventory).employee;
};

export const setName = (newName: string): void => {
	if (newName.length > 15) {
		newName = newName.substring(0, 15);
	}
	(_inventory as Inventory).employee = newName;
};

export const getTotal = (): number => { return _inventory.total; }

export const setTotal = (newTotal: number): void => { _inventory.total = newTotal; }

export const getSimpleAdders = (): number => { return _inventory.simple_adder; }

export const setSimpleAdders = (newCount: number): void => { _inventory.simple_adder = newCount; }

export const getDoubleAdders = (): number => { return _inventory.double_adder; }

export const setDoubleAdders = (newCount: number): void => { _inventory.double_adder = newCount; }
