export default class ElementFactory {
    constructor(elementTag, attribute, attributeValue, attribute2, attributeValue2, innerText, parentElement) {
        this.elementTagName = elementTag;
        this.attributeName = attribute;
        this.attributeValueName= attributeValue;
        this.attribute2Name = attribute2;
        this.attributeValue2Name = attributeValue2;
        this.innerTextName = innerText;
        this.elementParent = parentElement;
    };

    createIt() {
        let newElement = document.createElement(this.elementTagName);
        this.newElement = newElement;
    };

    addFirstAttribute() {
        this.newElement.setAttribute(this.attributeName, this.attributeValueName);
    };

    addSecondAttribute() {
        this.newElement.setAttribute(this.attribute2Name, this.attributeValue2Name);
    };

    addInnerText() {
        this.newElement.innerText = this.innerTextName;
    };

    appendToParentElement() {
        this.elementParent.appendChild(this.newElement);
    };
};

export let constructNewElement = (elementTag, attribute, attributeValue, attribute2, attributeValue2, innerText, parentElement) => {
    let newElement = new ElementFactory(elementTag, attribute, attributeValue, attribute2, attributeValue2, innerText, parentElement);
        newElement.createIt();
        newElement.addFirstAttribute();
        newElement.addSecondAttribute();
        newElement.addInnerText();
        newElement.appendToParentElement();
};

