import { HtmlElement } from "./HtmlElement.js";
export class Button extends HtmlElement {
	constructor(id = undefined, classes = undefined) {
		super(id, classes);
	}

	/**
	 * Registers a click event listener on the button element.
	 * @param {Function} callback - The function to be executed when the button is clicked.
	 */
	registerClickListener(callback, once = false) {
		this.element.addEventListener(
			"click",
			callback,
			once ? { once: true } : undefined
		);
	}

	/**
	 * Removes a click event listener from the button element.
	 * @param {Function} callback - The function to be removed from the event listener.
	 */
	removeClickListener(callback) {
		this.element.removeEventListener("click", callback);
	}

	/**
	 * Replaces the icon in the button element.
	 * @param {string} iconUrl - The URL of the new icon to be displayed.
	 * @throws {Error} If the element does not have an `<img>` child.
	 */
	replaceIcon(iconUrl) {
		const img = this.element.querySelector("img");
		if (!img) {
			console.warn(
				`[INVALID_OPERATION] at replaceIcon(), element does not have an <img> child`
			);
			return;
		}
		img.src = iconUrl;
	}
}
