import { initTerminal } from "./terminal.ts";
import { initComputeCanva } from "./computeCanva.ts";
import { loadInventory, loadFlags } from '../lib/savefile.ts';

document.addEventListener('DOMContentLoaded', () => {
	loadInventory();
	loadFlags();
	initTerminal();
	initComputeCanva();
});
