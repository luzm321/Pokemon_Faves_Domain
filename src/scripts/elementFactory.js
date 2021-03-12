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

    createIt(param1) {
        this.elementTagName = param1
        let newElement = document.createElement(this.elementTagName);
        this.newElement = newElement;
    };

    addFirstAttribute(attributeName, attributeValue) {
        this.attributeName = attributeName;
        this.attributeValueName = attributeValue;
        this.newElement.setAttribute(this.attributeName, this.attributeValueName);
    };

    addSecondAttribute(attribute2Name, attributeValue2) {
        this.attribute2Name = attribute2Name;
        this.attributeValue2Name = attributeValue2;
        this.newElement.setAttribute(this.attribute2Name, this.attributeValue2Name);
    };

    addInnerText(innerText) {
        this.innerTextName = innerText;
        this.newElement.innerText = this.innerTextName;
    };

    appendToParentElement(parentElement) {
        this.elementParent = parentElement;
        this.elementParent.appendChild(this.newElement);
    };

    constructNewElement (elementTag, attribute, attributeValue, attribute2, attributeValue2, innerText, parentElement) {
        this.createIt(elementTag);
        this.addFirstAttribute(attribute, attributeValue);
        this.addSecondAttribute(attribute2, attributeValue2);
        this.addInnerText(innerText);
        this.appendToParentElement(parentElement);
    };

};
