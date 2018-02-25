import React, { Fragment } from "react";
import FederationRegistrationModal from "../../../containers/federation/federation-registration-modal";
import FederationList from "../../../containers/federation/federation-list";

const federationDetails = () => {
    return(
        <Fragment>
            <FederationRegistrationModal />
            <FederationList isAdmin={false}/>
        </Fragment>
    );
};

export default federationDetails;