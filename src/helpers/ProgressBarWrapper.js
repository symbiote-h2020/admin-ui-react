import React, {Component, Fragment} from "react";
import { ProgressBar } from "react-bootstrap";

export default class ProgressBarWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bsStyle: props.bsStyle,
            uploadedPerCent: props.uploadedPerCent,
            completed: props.completed
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.uploadedPerCent !== this.state.uploadedPerCent ||
            nextProps.completed !== this.state.completed)
            this.setState({
                bsStyle : this.state.bsStyle,
                uploadedPerCent : nextProps.uploadedPerCent,
                completed : nextProps.completed
            });
    }

    render() {
        const { bsStyle, uploadedPerCent, completed } = this.state;

        if (uploadedPerCent)
            return (
                <Fragment>
                    <ProgressBar
                        bsStyle={bsStyle}
                        now={uploadedPerCent}
                        label={`${uploadedPerCent}%`} />
                    {uploadedPerCent === 100 && !completed ? this.props.waitingComponent() : null}
                </Fragment>

            );
        else
            return null;
    }

}