import { initTerminal } from "./terminal.ts";
import { initComputeCanva } from "./computeCanva.ts";
import { loadInventory } from '../lib/savefile.ts';

document.addEventListener('DOMContentLoaded', () => {
	loadInventory();
	initTerminal();
	initComputeCanva();
});
