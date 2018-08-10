import React, {Fragment} from "react";
import MappingsList from "../../../containers/mapping/mappings-list";

const AllMappings = () => {
    return(
        <Fragment>
            <MappingsList all={true}/>
        </Fragment>
    );
};

export default AllMappings;