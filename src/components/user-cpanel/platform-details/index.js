import React, { Fragment } from "react";
import PlatformRegistrationModal from "../../../containers/platform-registration-modal";
import PlatformUpdateModal from "../../../containers/platform-update-modal";
import PlatformList from "../../../containers/platform-list";

const PlatformDetails = () => {
    return(
        <Fragment>
            <PlatformRegistrationModal />
            <PlatformUpdateModal/>
            <PlatformList />
        </Fragment>
    );
};

export default PlatformDetails;