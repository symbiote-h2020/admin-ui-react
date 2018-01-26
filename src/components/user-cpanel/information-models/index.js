import React, { Fragment } from "react";
import InformationModelRegistrationModal from "../../../containers/information-models/information-model-registration-modal";
import InformationModelList from "../../../containers/information-models/information-model-list";

const InformationModels = () => {
    return(
        <Fragment>
            <InformationModelRegistrationModal />
            <InformationModelList />
        </Fragment>
    );
};

export default InformationModels;