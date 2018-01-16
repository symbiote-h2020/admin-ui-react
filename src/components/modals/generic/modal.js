import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../index";
import AppendBodyComponent from "../../../helpers/append-body-component";
import uuid from "../../../helpers/uuid";

export default class Modal extends AppendBodyComponent {
    constructor(props) {
        super(props);

        this.uniqueId = props.id ? props.id : uuid();
        this.setAppendElementId(this.uniqueId);
    }

    componentDidMount() {
        this.updateSelf();
    }

    componentDidUpdate() {
        this.updateSelf();
    }

    componentWillUnmount() {
        this.removeAppendElement();
    }

    updateSelf() {
        this.updateAppendElement(
            <Provider store={store} key={this.uniqueId}>
                {this.props.children}
            </Provider>
        );
    }

    render() {
        // Rendering is managed by ourselves since this appends a component to the DOM
        return null;
    }
}