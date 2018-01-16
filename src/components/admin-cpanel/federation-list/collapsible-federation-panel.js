import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import FederationPanelBody from "./federation-panel-body";

export default class CollapsibleFederationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            federation : props.federation,
        };

        this.togglePanel = this.togglePanel.bind(this);
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.federation !== this.state.federation)
            this.setState({
                    ...this.state,
                infoModel : nextProps.infoModel
            });
    }

    togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
    };

    handleOpenDeleteModal = () => {
        this.props.openDeleteModal(this.props.federation.federationId);
    };

    render() {
        const { federation } = this.state;

        return(
            <Panel id="id" bsStyle="primary" className="federation-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                    <Panel.Title componentClass="h3">
                        {federation.federationId}
                    </Panel.Title>
                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                </Panel.Heading>
                <Panel.Collapse>
                    <FederationPanelBody federation={federation} />
                </Panel.Collapse>
                <Panel.Footer className="federation-info-footer">
                    <Button
                        className="btn-warning-delete"
                        bsStyle="warning"
                        onClick={this.handleOpenDeleteModal}>
                        Delete
                    </Button>

                </Panel.Footer>
            </Panel>
        );
    }
}