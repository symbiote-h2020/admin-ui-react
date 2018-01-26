import React, { Fragment } from "react";
import FederationRegistrationModal from "../../../containers/federations/federation-registration-modal";
import FederationList from "../../../containers/federations/federation-list";

const federationDetails = () => {
    return(
        <Fragment>
            <FederationRegistrationModal />
            <FederationList />
        </Fragment>
    );
};

export default federationDetails;