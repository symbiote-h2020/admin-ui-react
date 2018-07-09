import React, { Fragment } from "react";
import Header from "../../containers/control-panel/cpanel-header";
import Main from "./main";
import AcceptTermsModal from "../../containers/users/accept-terms-modal";
import "../../style/cpanel.css";

const UserControlPanel = (props) => {
    return(
        <Fragment>
            <Header history={props.history}/>
            <Main/>
            <AcceptTermsModal />
        </Fragment>
    );
};

export default UserControlPanel;