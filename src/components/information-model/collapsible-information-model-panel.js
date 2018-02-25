import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import InfoModelPanelBody from "./info-model-panel-body";

export default class CollapsibleInformationModelPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            infoModel : props.infoModel,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.infoModel !== this.state.infoModel)
            this.setState({
                open : this.state.open,
                infoModel : nextProps.infoModel
            });
    }

    togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
    };

    handleOpenDeleteModal = () => {
        this.props.openDeleteModal(this.props.infoModel.id);
    };

    render() {
        const { infoModel } = this.state;

        return(
            <Panel id="id" bsStyle="primary" className="info-model-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                    <Panel.Title componentClass="h3">
                        {infoModel.name}
                    </Panel.Title>
                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                </Panel.Heading>
                <Panel.Collapse>
                    <InfoModelPanelBody infoModel={infoModel} />
                </Panel.Collapse>
                <Panel.Footer className="info-model-info-footer">
                    <Button
                        className="panel-footer-btn"
                        bsStyle="warning"
                        onClick={this.handleOpenDeleteModal.bind(this)}>
                        Delete
                    </Button>

                </Panel.Footer>
            </Panel>
        );
    }
}