import { setTotal } from "./computeLab";
import inventory from '../data/inventory.json';
import { Inventory } from './types/inventory.ts';

export const loadTotal = (): void => {
	const savedTotal: string | null = localStorage.getItem("total");
	!savedTotal ? setTotal(0) : setTotal(Number(savedTotal));
};

export const saveInventory = (): void => {
	const invToSave: string = JSON.stringify(inventory);
	localStorage.setItem("inv", invToSave);
};

export const setName = (newName: string): void => {
	if (newName.length > 15) {
		newName = newName.substring(0, 15);
	}
	(inventory as Inventory).employee = newName;
};

export const getCurrentInventory = (): typeof inventory => {
	return inventory;
};

export const getName = (): string => {
	console.log("name:", (inventory as Inventory).employee);
	return (inventory as Inventory).employee;
};
