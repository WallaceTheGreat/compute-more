export const EVENTS = {
	UPDATE_PROMPT: "compute:update-prompt",
	UPDATE_COUNT: "compute:update-count",
};

export const myDispatchEvent = (e: any, details: any | null = null) => {
	if (details) {
		document.dispatchEvent(
			new CustomEvent(e, { detail: details })
		);
	} else {
		document.dispatchEvent(
			new CustomEvent(e)
		);
	}
}
