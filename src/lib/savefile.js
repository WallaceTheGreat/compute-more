import {getCurrentInventory, getTotal, setTotal} from "./computeLab.js";

export function saveTotal() {
	localStorage.setItem("total", getTotal());
}

export function loadTotal() {
	const savedTotal = localStorage.getItem("total");
	setTotal(savedTotal);
}

export function saveInventory() {
	localStorage.setItem("inv", getCurrentInventory());
}