import React, { Component } from "react";
import { connect } from "react-redux";
import { FieldError } from "../../helpers/errors";

class UserInformation extends Component {

    render() {
        const { email, fetchUserInformationError } = this.props.userDetails;

        return(
            <div>
                <FieldError error={fetchUserInformationError}/>
                Email: {email}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails
    };
}

export default connect(mapStateToProps, { })(UserInformation);