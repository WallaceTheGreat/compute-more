import { initTerminal } from "./terminal.ts";
import { initComputeCanva } from "./computeCanva.ts";
import { loadInventory, loadFlags, saveInventory, saveFlags } from '../lib/savefile.ts';

document.addEventListener('DOMContentLoaded', () => {
	loadInventory();
	loadFlags();
	initTerminal();
	initComputeCanva();
});

window.addEventListener('beforeunload', () => {
	saveInventory();
	saveFlags();
});
