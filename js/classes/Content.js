import { HtmlElement } from "./HtmlElement.js";
export class Content extends HtmlElement {
	constructor(id = undefined, classes = undefined) {
		super(id, classes);
	}

	/**
	 * Sets the display style of the HTML element.
	 * @param {string} mode - The display mode to set.
	 *                        Accepts "none", "block", or "flex".
	 */
	setDisplay(mode) {
		switch (mode) {
			case "none":
				this.element.style.display = "none";
				break;
			case "block":
				this.element.style.display = "block";
				break;
			case "flex":
				this.element.style.display = "flex";
				break;
			default:
				console.warn(
					"[INVALID_PARAMETER] at setDisplay(), mode must be 'none', 'block', or 'flex'"
				);
		}
	}
}
