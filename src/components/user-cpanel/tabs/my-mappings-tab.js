import React, {Fragment} from "react";
import MappingsList from "../../../containers/mapping/mappings-list";
import MappingRegistrationModal from "../../../containers/mapping/mapping-registration-modal";

const MyMappings = () => {
    return(
        <Fragment>
            <MappingsList all={false}/>
            <MappingRegistrationModal />
        </Fragment>
    );
};

export default MyMappings;