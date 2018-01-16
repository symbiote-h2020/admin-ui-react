import React, { Component } from "react";
import { Alert } from "react-bootstrap";

export const FieldError = ({error}) => {
    if (error)
        return (
            <Alert bsStyle="danger">
                <strong>{error}</strong>
            </Alert>
        );
    else
        return null;
};

export class AlertDismissable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alertStyle : props.alertStyle,
            message : props.message
        };

    }

    componentWillReceiveProps(nextProps) {
        // Check next stater on an unneeded render
        if (nextProps.message !== this.state.message) {
            this.setState({
                alertStyle : nextProps.alertStyle,
                message : nextProps.message
            });
        }
    }


    render() {
        const { alertStyle, message } = this.state;
        if (message)
            return (
                <Alert bsStyle={alertStyle} onDismiss={this.props.dismissHandler}>
                    <strong>{message}</strong>
                </Alert>
            );
        else
            return null;
    }
}