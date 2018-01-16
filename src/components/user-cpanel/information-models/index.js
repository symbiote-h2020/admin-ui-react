import React, { Fragment } from "react";
import InformationModelRegistrationModal from "../../../containers/information-model-registration-modal";
import InformationModelList from "../../../containers/information-model-list";

const InformationModels = () => {
    return(
        <Fragment>
            <InformationModelRegistrationModal />
            <InformationModelList />
        </Fragment>
    );
};

export default InformationModels;