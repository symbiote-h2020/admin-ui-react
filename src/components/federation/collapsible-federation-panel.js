import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import FederationPanelBody from "./federation-panel-body";

export default class CollapsibleFederationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            federation: props.federation,
            userPlatforms: props.userPlatforms
        };

        this.togglePanel = this.togglePanel.bind(this);
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.federation !== this.state.federation || nextProps.userPlatforms !== this.state.userPlatforms)
            this.setState({
                    ...this.state,
                federation : nextProps.federation,
                userPlatforms : nextProps.userPlatforms
            });
    }

    togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
    };

    handleOpenDeleteModal = () => {
        this.props.openDeleteModal(this.props.federation.id);
    };

    render() {
        const { federation, userPlatforms } = this.state;
        const { isAdmin } = this.props;

        return(
            <Panel id="id" bsStyle="primary" className="federation-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                    <Panel.Title componentClass="h3">
                        {federation.name}
                    </Panel.Title>
                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                </Panel.Heading>
                <Panel.Collapse>
                    <FederationPanelBody
                        federation={federation}
                        userPlatforms={userPlatforms}
                        availableInfoModels={this.props.informationModels.availableInfoModels}
                        isAdmin={isAdmin}
                        onOpenLeaveModal={this.props.openLeaveModal}
                    />
                </Panel.Collapse>
                <Panel.Footer className="federation-info-footer">
                    {!isAdmin ? "" :
                        <Button
                            className="panel-footer-btn"
                            bsStyle="warning"
                            onClick={this.handleOpenDeleteModal}>
                            Delete
                        </Button>
                    }
                </Panel.Footer>
            </Panel>
        );
    }
}