import React, { Fragment } from "react";
import FederationRegistrationModal from "../../../containers/federation-registration-modal";
import FederationList from "../../../containers/federation-list";

const federationDetails = () => {
    return(
        <Fragment>
            <FederationRegistrationModal />
            <FederationList />
        </Fragment>
    );
};

export default federationDetails;