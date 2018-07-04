import React from "react";
import { Button } from "react-bootstrap";
import "../style/denied.css";
import {USER_CPANEL_URL} from "../configuration";

const Denied = ({ history }) => {

    const handleClick = (e) => {
        e.preventDefault();
        history.push(USER_CPANEL_URL);
    };

    return(
        <div className="container">
            <div className="row text-center">
                <div className="col-sm-6 col-sm-offset-3">
                    <br/>
                    <br/>
                    <h2 style={{color : "#ff1a1a"}}>Access Denied</h2>
                    <p style={{fontSize: "20px" ,color: "#5C5C5C"}}>You are not authorized to access this page</p>
                    <Button bsStyle="info" className="login" onClick={handleClick}>User Control Panel</Button>
                    <br/>
                    <br/>
                </div>

            </div>
        </div>
     );
};

export default Denied;