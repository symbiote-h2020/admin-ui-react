import React, { Fragment } from "react";
import PlatformRegistrationModal from "../../../containers/platform-registration-modal";
import PlatformList from "../../../containers/platform-list";

const PlatformDetails = () => {
    return(
        <Fragment>
            <PlatformRegistrationModal />
            <PlatformList />
        </Fragment>
    );
};

export default PlatformDetails;