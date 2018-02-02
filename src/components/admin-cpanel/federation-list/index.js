import React, { Fragment } from "react";
import FederationRegistrationModal from "../../../containers/federations/federation-registration-modal";
import FederationList from "../../../containers/federations/federation-list";

const federationDetails = () => {
    return(
        <Fragment>
            <FederationRegistrationModal />
            <FederationList isAdmin={true}/>
        </Fragment>
    );
};

export default federationDetails;