import React, { Fragment } from "react";
import SSPRegistrationModal from "../../../containers/ssp/ssp-registration-modal";
import SSPList from "../../../containers/ssp/ssp-list";

const SSPDetails = () => {
    return(
        <Fragment>
            <SSPRegistrationModal />
            <SSPList />
        </Fragment>
    );
};

export default SSPDetails;