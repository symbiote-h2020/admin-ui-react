import React, {Fragment} from "react";
import MappingsList from "../../../containers/mapping/mappings-list";

const MyMappings = () => {
    return(
        <Fragment>
            <MappingsList all={false}/>
        </Fragment>
    );
};

export default MyMappings;