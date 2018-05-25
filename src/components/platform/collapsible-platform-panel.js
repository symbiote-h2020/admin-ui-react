import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import PlatformPanelBody from "./platform-panel-body";
import {
    ACTIVATE_PLATFORM_DELETE_MODAL, ACTIVATE_PLATFORM_CONFIG_MODAL, ACTIVATE_PLATFORM_UPDATE_MODAL
} from "../../actions/index";

export default class CollapsiblePlatformPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            platform : props.platform,
            informationModels : props.informationModels
        };
        
        this.togglePanel = this.togglePanel.bind(this);
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleOpenUpdateModal = this.handleOpenUpdateModal.bind(this);
        this.handleOpenConfigModal = this.handleOpenConfigModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.platform !== this.state.platform ||
            nextProps.informationModels !== this.state.informationModels)
            this.setState({
                open : this.state.open,
                platform : nextProps.platform,
                informationModels : nextProps.informationModels
            });
    }

    togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
    };

    handleOpenDeleteModal = () => {
        this.props.openModal(ACTIVATE_PLATFORM_DELETE_MODAL, this.props.platform.id);
    };

    handleOpenUpdateModal = () => {
        this.props.openModal(ACTIVATE_PLATFORM_UPDATE_MODAL, this.props.platform.id);
    };

    handleOpenConfigModal = () => {
        this.props.openModal(ACTIVATE_PLATFORM_CONFIG_MODAL, this.props.platform.id);
    };

    render() {
        const { platform, informationModels : {availableInfoModels} } = this.state;
        const informationModelId = platform.interworkingServices[0].informationModelId;
        const informationModelOptions = [{
            label : availableInfoModels[informationModelId] ? availableInfoModels[informationModelId].name : "Fetching info...",
            value : informationModelId
        }];
        const platformOptions = [{
            label : platform.isEnabler ? "Enabler" : "Platform",
            value : platform.isEnabler ? "true" : "false"
        }];

        return(
            <Panel id="id" bsStyle="primary" className="platform-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                    <Panel.Title componentClass="h3">
                       {platform.name}
                    </Panel.Title>
                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                </Panel.Heading>
                <Panel.Collapse>
                    <PlatformPanelBody
                        platform={platform}
                        informationModelOptions={informationModelOptions}
                        platformOptions={platformOptions} />
                </Panel.Collapse>
                <Panel.Footer className="platform-info-footer">
                    <Button
                        bsStyle="info"
                        onClick={this.handleOpenConfigModal}>
                        Get Configuration
                    </Button>
                    <Button
                        className="panel-footer-btn"
                        bsStyle="warning"
                        onClick={this.handleOpenDeleteModal}>
                        Delete
                    </Button>
                    <Button
                        className="panel-footer-btn"
                        bsStyle="info"
                        onClick={this.handleOpenUpdateModal}>
                        Update
                    </Button>
                </Panel.Footer>
            </Panel>
        );
    }
}