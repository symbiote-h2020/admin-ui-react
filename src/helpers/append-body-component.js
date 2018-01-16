import React, {Fragment} from "react";
import ReactDOM from "react-dom";

const appendedElements = {};
const appendElementContainer = document.querySelector('.append-element-container');

function getAppendedElements() {
    const elements = [];

    const keys = Object.keys(appendedElements);
    const length = keys.length;

    if (length > 0) {
        keys.forEach((key) => {
            elements.push(appendedElements[key]);
        });
    }

    return elements;
}

export default class AppendBodyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.appendElementContainer = appendElementContainer;
    }

    setAppendElementId(id) {
        this.appendElementId = id;
    }

    updateAppendElement(content) {
        appendedElements[this.appendElementId] = content;

        this.updateAppendElements();
    }

    updateAppendElements() {
        ReactDOM.render(
            <Fragment>{getAppendedElements()}</Fragment>,
            this.appendElementContainer);
    }

    removeAppendElement() {
        delete appendedElements[this.appendElementId];

        this.updateAppendElements();
    }
}