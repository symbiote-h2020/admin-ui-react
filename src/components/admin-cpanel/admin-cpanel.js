import React, { Fragment } from "react";
import Header from "../../containers/cpanel-header";
import Main from "./main";
import "../../style/cpanel.css";

const AdminControlPanel = (props) => {
    return(
        <Fragment>
            <Header history={props.history}/>
            <Main/>
        </Fragment>
    );
};

export default AdminControlPanel;