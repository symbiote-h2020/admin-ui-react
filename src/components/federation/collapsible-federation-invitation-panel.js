import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import FederationPanelBody from "./federation-panel-body";

export default class CollapsibleFederationInvitationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            federation: props.federation,
            platform: props.platform,
            userPlatforms: props.userPlatforms
        };

        this.togglePanel = this.togglePanel.bind(this);
        this.handleOpenInvitationModal = this.handleOpenInvitationModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.federation !== this.state.federation ||
            nextProps.platform !== this.state.platform ||
            nextProps.userPlatforms !== this.state.userPlatforms)
            this.setState({
                ...this.state,
                federation : nextProps.federation,
                platform : nextProps.platform,
                userPlatforms : nextProps.userPlatforms
            });
    }

    togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
    };

    handleOpenInvitationModal = () => {
        // this.props.openModal();
    };

    render() {
        const { federation, platform } = this.state;
        const { isAdmin } = this.props;

        return(
            <Panel id="id" bsStyle="primary" className="federation-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                    <Panel.Title componentClass="h3">
                        {platform.name}
                    </Panel.Title>
                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                </Panel.Heading>
                <Panel.Collapse>
                    <FederationPanelBody
                        federation={federation}
                        availableInfoModels={this.props.informationModels.availableInfoModels}
                        isAdmin={isAdmin}
                        onOpenLeaveModal={this.props.openLeaveModal}
                    />
                </Panel.Collapse>
                <Panel.Footer className="federation-info-footer">
                    <p style={{fontSize: "medium"}}>
                        Invitation for platform <strong>{platform.name}</strong> to join federation <strong>{federation.name}</strong>
                    </p>
                    <Button
                        bsStyle="info"
                        onClick={this.handleOpenInvitationModal}>
                        Accept
                    </Button>
                    <Button
                        className="panel-footer-btn"
                        bsStyle="warning"
                        onClick={this.handleOpenInvitationModal}>
                        Reject
                    </Button>
                </Panel.Footer>
            </Panel>
        );
    }
}