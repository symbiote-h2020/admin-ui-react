import React, { Fragment } from "react";
import FederationRegistrationModal from "../../../containers/federations/federation-registration-modal";
import UserFederationList from "../../../containers/federations/user-federation-list";

const federationDetails = () => {
    return(
        <Fragment>
            <FederationRegistrationModal />
            <UserFederationList />
        </Fragment>
    );
};

export default federationDetails;