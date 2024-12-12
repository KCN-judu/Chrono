import { HtmlElement } from "./HtmlElement.js";

export class Text extends HtmlElement {
	constructor(id = undefined, classes = undefined) {
		super(id, classes);
	}

	/**
	 * Replaces the text content of the text node at a given index in the Content element.
	 * @param {string} text - the text to replace the current text with
	 * @param {number} [index=0] - the index of the text node to replace
	 */
	replaceText(text, index = 0) {
		const childTextNode = Array.prototype.filter.call(
			this.element.childNodes,
			(node) => node.nodeType === Node.TEXT_NODE
		);
		if (!childTextNode[index]) {
			console.warn(
				"[INVALID_PARAMETER] at replaceText(), element does not have a text node"
			);
			return;
		}
		childTextNode[index].textContent = text;
	}

	/**
	 * Appends text to the text content of the text node at a given index in the Content element.
	 * @param {string} text - the text to append to the current text
	 * @param {number} [index=0] - the index of the text node to append to
	 */
	appendText(text, index = 0) {
		const childTextNode = Array.prototype.filter.call(
			this.element.childNodes,
			(node) => node.nodeType === Node.TEXT_NODE
		);
		if (!childTextNode[index]) {
			console.warn(
				"[INVALID_PARAMETER] at appendText(), element does not have a text node"
			);
			return;
		}
		childTextNode[index].textContent += text;
	}
}
