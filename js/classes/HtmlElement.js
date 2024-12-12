export class HtmlElement {
	/**
	 * Constructs a new HtmlElement object.
	 * @param {string} id - the id of the HTML element
	 * @param {string|string[]} [classes] - the class or classes of the HTML element
	 */
	constructor(id = undefined, classes = undefined) {
		this.id = id;
		this.classes = classes;
		if (!classes) {
			this.element = document.getElementById(this.id);
			if (!this.element) {
				console.warn(
					`[INVALID_PARAMETER] at HtmlElement(), element id does not exist: ${this.id}`
				);
			}
		} else {
			let cssSelector = "";
			cssSelector += !id ? "" : `#${id}`;
			if (Array.isArray(classes)) {
				for (const cls of classes) {
					cssSelector += `.${cls}`;
				}
			} else cssSelector += `.${classes}`;
			this.element = document.querySelector(cssSelector);
			if (!this.element) {
				console.warn(
					`[INVALID_PARAMETER] at HtmlElement(), element selector does not exist: ${cssSelector}`
				);
			}
		}
	}
}
