import React, {Fragment} from "react";
import MappingsList from "../../../containers/mapping/mappings-list";
import MappingRegistrationModal from "../../../containers/mapping/mapping-registration-modal";
const AllMappings = () => {
    return(
        <Fragment>
            <MappingsList all={true}/>
            <MappingRegistrationModal />
        </Fragment>
    );
};

export default AllMappings;