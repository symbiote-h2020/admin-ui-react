import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import {
    ACTIVATE_SSP_DELETE_MODAL
} from "../../actions";

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

    render() {
        const { ssp } = this.state;
        // const informationModelId = ssp.interworkingServices[0].informationModelId;
        // const informationModelOptions = [{
        //     label : availableInfoModels[informationModelId].name,
        //     value : informationModelId
        // }];

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
                    {/*<PlatformPanelBody*/}
                        {/*platform={ssp}*/}
                        {/*informationModelOptions={informationModelOptions}*/}
                        {/*platformOptions={platformOptions} */}
                    {/*/>*/}
                </Panel.Collapse>
                <Panel.Footer className="platform-info-footer">
                    <Button
                        className="panel-footer-btn"
                        bsStyle="warning"
                        onClick={this.handleOpenDeleteModal}>
                        Delete
                    </Button>
                </Panel.Footer>
            </Panel>
        );
    }
}