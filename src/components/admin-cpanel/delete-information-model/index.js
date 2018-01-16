import React, { Component } from "react";
import { FormGroup, FormControl, HelpBlock, Col, Button } from "react-bootstrap";
import axios from "axios";
import { ROOT_URL } from "../../../configuration";
import { headers} from "../../../actions";
import { AlertDismissable } from "../../../helpers/errors";

export default class DeleteInformationModel extends Component {

    constructor() {
        super();

        this.state = {
            infoModelIdToDelete : "",
            successMessage : "",
            errorMessage : ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDismissSuccessMessage = this.onDismissSuccessMessage.bind(this);
        this.onDismissErrorMessage = this.onDismissErrorMessage.bind(this);

        axios.defaults.withCredentials = true;
    }

    onChange(event) {
        this.setState({ ...this.state,  infoModelIdToDelete : event.target.value });
    }

    onDismissSuccessMessage() {
        this.setState({ ...this.state,  successMessage : "" });

    }

    onDismissErrorMessage() {
        this.setState({ ...this.state,  errorMessage : "" });
    }

    onSubmit(ev) {
        ev.preventDefault();

        const url = `${ROOT_URL}/admin/cpanel/delete_information_model`;
        // eslint-disable-next-line
        const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
        let formData = new FormData();
        formData.append('infoModelIdToDelete', this.state.infoModelIdToDelete);


        const config = {
            url: url,
            method: 'post',
            data: formData,
            headers: customHeaders
        };

        axios.request(config)
            .then(() => {
                const successMessage = `The information model with id "${this.state.infoModelIdToDelete}" was successfully deleted`;
                this.setState({
                    infoModelIdToDelete : "",
                    successMessage : successMessage,
                    errorMessage : ""
                });
            })
            .catch((res) => {
                this.setState({
                    ...this.state,
                    successMessage : "",
                    errorMessage : res.response.data
                });
            });
    }

    render() {
        return(
            <form onSubmit={this.onSubmit}>
                <AlertDismissable
                    alertStyle="danger"
                    message={this.state.errorMessage}
                    dismissHandler={this.onDismissErrorMessage}
                />
                <AlertDismissable
                    alertStyle="success"
                    message={this.state.successMessage}
                    dismissHandler={this.onDismissSuccessMessage}
                />

                <Col xs={6} sm={6} md={6} lg={6}>
                    <FormGroup>
                        <FormControl
                            placeholder="Information Model Id"
                            value={this.state.infoModelIdToDelete}
                            onChange={this.onChange}
                        />
                        <HelpBlock>Id of the information model to be deleted</HelpBlock>
                        <Button type="submit" bsStyle="danger">Submit</Button>
                    </FormGroup>
                </Col>
            </form>
        );
    }
};
