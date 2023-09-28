export class Component {
    root: HTMLElement;
    parent: HTMLElement | null;

    constructor(
        parent: HTMLElement | null,
        tagName: keyof HTMLElementTagNameMap,
        attributes?: { [key: string]: string } | null,
        content?: string | null
    ) {
        this.root = document.createElement(tagName);

        if (attributes) {
            for (const key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    this.root.setAttribute(key, attributes[key]);
                }
            }
        }

        if (content) {
            this.root.innerHTML = content;
        }

        this.parent = parent;
        this.render();
    }

    render() {
        if (this.parent) {
            this.parent.appendChild(this.root);
        }
    }

    remove() {
        if (this.parent && this.root.parentNode === this.parent) {
            this.parent.removeChild(this.root);
        }
    }
}