import React, { Fragment } from "react";
import PlatformRegistrationModal from "../../../containers/platforms/platform-registration-modal";
import PlatformUpdateModal from "../../../containers/platforms/platform-update-modal";
import PlatformList from "../../../containers/platforms/platform-list";

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