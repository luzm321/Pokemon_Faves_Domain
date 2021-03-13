export default class ElementFactory {
    constructor() {
    };

    createIt(elementTag) {
        this.newElement = document.createElement(elementTag);
    };

    addFirstAttribute(attributeName, attributeValue) {
        this.newElement.setAttribute(attributeName, attributeValue);
    };

    addSecondAttribute(attributeName2, attributeValue2) {
        this.newElement.setAttribute(attributeName2, attributeValue2);
    };

    addText(elementInnerText) {
        this.newElement.innerText = `${elementInnerText}`;
    };

    appendToParent(parentElement) {
        parentElement.appendChild(this.newElement);
    };

    createNewElement(elementTag, attributeName, attributeValue, attributeName2, attributeValue2, elementInnerText, parentElement) {
        try {
            this.createIt(elementTag);
            this.addFirstAttribute(attributeName, attributeValue);
            this.addSecondAttribute(attributeName2, attributeValue2);
            this.addText(elementInnerText);
            this.appendToParent(parentElement);
        } catch (e) {
            console.error (e);
        };
    };
};