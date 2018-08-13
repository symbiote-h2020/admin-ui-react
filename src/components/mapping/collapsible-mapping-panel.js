import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import MappingPanelBody from "./mapping-panel-body";
import downloadZipFile from "../../helpers/download-zip-file";

export default class CollapsibleMappingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            mapping : props.mapping,
            informationModelOptions: props.informationModelOptions
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mapping !== this.state.mapping
            || nextProps.informationModelOptions !== this.state.informationModelOptions)
            this.setState({
                open : this.state.open,
                mapping : nextProps.mapping,
                informationModelOptions : nextProps.informationModelOptions
            });
    }

    togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
    };

    handleGetMappingDefinition = () => {
        this.props.getMappingDefinition(this.props.mapping.id, (res) => {
            downloadZipFile(res, () => {}, this.props.history, this.props.changeModalState);

        });
    };

    handleOpenDeleteModal = () => {
        this.props.openDeleteModal(this.props.mapping.id);
    };

    render() {
        const { mapping, informationModelOptions } = this.state;

        return(
            <Panel id="id" bsStyle="primary" className="info-model-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                    <Panel.Title componentClass="h3">
                        {mapping.name}
                    </Panel.Title>
                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                </Panel.Heading>
                <Panel.Collapse>
                    <MappingPanelBody mapping={mapping} informationModelOptions={informationModelOptions}/>
                </Panel.Collapse>
                <Panel.Footer className="info-model-info-footer">
                    {
                        this.props.username === this.props.mapping.owner ?
                            <Button
                                className="panel-footer-btn"
                                bsStyle="warning"
                                onClick={this.handleOpenDeleteModal.bind(this)}>
                                Delete
                            </Button>
                            : ""
                    }
                    <Button
                        className="panel-footer-btn"
                        bsStyle="info"
                        onClick={this.handleGetMappingDefinition.bind(this)}>
                        Get Mapping Definition
                    </Button>
                </Panel.Footer>
            </Panel>
        );
    }
}