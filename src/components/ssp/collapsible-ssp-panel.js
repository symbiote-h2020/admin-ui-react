import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import {
    ACTIVATE_SSP_CONFIG_MODAL, ACTIVATE_SSP_DELETE_MODAL, ACTIVATE_SSP_UPDATE_MODAL
} from "../../actions";
import SSPPanelBody from "./ssp-panel-body";

export default class CollapsibleSSPPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            ssp : props.ssp,
            informationModels : props.informationModels
        };
        
        this.togglePanel = this.togglePanel.bind(this);
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleOpenConfigModal = this.handleOpenConfigModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ssp !== this.state.ssp ||
            nextProps.informationModels !== this.state.informationModels)
            this.setState({
                open : this.state.open,
                ssp : nextProps.ssp,
                informationModels : nextProps.informationModels
            });
    }

    togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
    };

    handleOpenDeleteModal = () => {
        this.props.openModal(ACTIVATE_SSP_DELETE_MODAL, this.props.ssp.id);
    };

    handleOpenUpdateModal = () => {
        this.props.openModal(ACTIVATE_SSP_UPDATE_MODAL, this.props.ssp.id);
    };

    handleOpenConfigModal = () => {
        this.props.openModal(ACTIVATE_SSP_CONFIG_MODAL, this.props.ssp.id);
    };

    render() {
        const { ssp, informationModels : {availableInfoModels} } = this.state;
        const informationModelId = ssp.informationModelId;
        const informationModelOptions = [{
            label : availableInfoModels[informationModelId] ? availableInfoModels[informationModelId].name : "Fetching info...",
            value : informationModelId
        }];
        const exposingSiteLocalAddressOptions = [{
            label : ssp.exposingSiteLocalAddress ? "Yes" : "No",
            value : ssp.exposingSiteLocalAddress ? "true" : "false"
        }];


        return(
            <Panel id="id" bsStyle="primary" className="platform-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                    <Panel.Title componentClass="h3">
                       {ssp.id}
                    </Panel.Title>
                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                </Panel.Heading>
                <Panel.Collapse>
                    <SSPPanelBody
                        ssp={ssp}
                        informationModelOptions={informationModelOptions}
                        exposingSiteLocalAddressOptions={exposingSiteLocalAddressOptions}
                    />
                </Panel.Collapse>
                <Panel.Footer className="platform-info-footer">
                    {/*<Button*/}
                        {/*bsStyle="info"*/}
                        {/*onClick={this.handleOpenConfigModal}>*/}
                        {/*Get Configuration*/}
                    {/*</Button>*/}
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