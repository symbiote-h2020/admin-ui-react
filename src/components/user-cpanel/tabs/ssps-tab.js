import React, { Fragment } from "react";
import SSPRegistrationModal from "../../../containers/ssp/ssp-registration-modal";
import SSPUpdateModal from "../../../containers/ssp/ssp-update-modal";
import SSPList from "../../../containers/ssp/ssp-list";

const SSPDetails = () => {
    return(
        <Fragment>
            <SSPRegistrationModal />
            <SSPUpdateModal />
            <SSPList />
        </Fragment>
    );
};

export default SSPDetails;