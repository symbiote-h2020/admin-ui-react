import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import MappingPanelBody from "./mapping-panel-body";

export default class CollapsibleMappingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            mapping : props.mapping,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mapping !== this.state.mapping)
            this.setState({
                open : this.state.open,
                mapping : nextProps.mapping
            });
    }

    togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
    };

    handleOpenDeleteModal = () => {
        this.props.openDeleteModal(this.props.mapping.id);
    };

    render() {
        const { mapping } = this.state;

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
                    <MappingPanelBody mapping={mapping} />
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
                </Panel.Footer>
            </Panel>
        );
    }
}