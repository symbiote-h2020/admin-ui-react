import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import ClientPanelBody from "./client-panel-body";
import {
    ACTIVATE_CLIENT_DELETE_MODAL
} from "../../actions";

export default class CollapsibleClientPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            certificate : props.certificate
        };

        this.togglePanel = this.togglePanel.bind(this);
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.certificate !== this.state.certificate)
            this.setState({
                open : this.state.open,
                certificate : nextProps.certificate
            });
    }

    togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
    };

    handleOpenDeleteModal = () => {
        this.props.openModal(ACTIVATE_CLIENT_DELETE_MODAL, this.props.id);
    };

    render() {
        const { certificate } = this.state;
        const { id } = this.props;

        return(
            <Panel id="id" bsStyle="primary" className="client-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                    <Panel.Title componentClass="h3">
                       {id}
                    </Panel.Title>
                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                </Panel.Heading>
                <Panel.Collapse>
                    <ClientPanelBody
                        certificate={certificate}
                    />
                </Panel.Collapse>
                <Panel.Footer className="client-info-footer">
                    <Button
                        className="panel-footer-btn"
                        bsStyle="warning"
                        onClick={this.handleOpenDeleteModal}>
                        Revoke Certificate
                    </Button>
                </Panel.Footer>
            </Panel>
        );
    }
}