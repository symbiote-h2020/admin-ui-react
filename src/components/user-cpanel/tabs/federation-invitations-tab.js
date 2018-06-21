import React, { Fragment } from "react";
import FederationInvitationList from "../../../containers/federation/federation-invitations-list";

const FederationInvitationDetails = () => {
    return(
        <Fragment>
            <FederationInvitationList isAdmin={false}/>
        </Fragment>
    );
};

export default FederationInvitationDetails;