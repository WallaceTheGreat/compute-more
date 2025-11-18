import {setTotal} from "./computeLab.ts";
import inventory from '../data/inventory.json';

export function loadTotal()
{
	const savedTotal = localStorage.getItem("total");
	!savedTotal ? setTotal(0) : setTotal(savedTotal);
}

export function saveInventory()
{
	const invToSave = JSON.stringify(inventory);
	localStorage.setItem("inv", invToSave);
}

export function setName(newName)
{
	if (newName.length > 15) {
		newName = newName.substring(0, 15);
	}
	inventory.employee = newName;
}

export function getCurrentInventory() {
	return inventory;
}

export function getName()
{
	console.log("name:", inventory.employee);
	return inventory.employee;
}
