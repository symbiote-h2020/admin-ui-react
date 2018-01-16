import React from "react";
import homepage  from "../../images/symbiote-homepage.png";
import iot_epi_logo from "../../images/IoT-EPI-logo1.png";
import ech2020 from "../../images/ECH2020.png";

const Footer = () => {
    return (
        <div className="footer">
            <a className="external symbiote" href="http://www.symbiote-h2020.eu/">
                <img src={homepage} alt="symbiote-homepage.png" />
            </a>
            <a className="external epi" href="http://iot-epi.eu/">
                <img src={iot_epi_logo} alt="IoT-EPI-logo1.png" />
            </a>
            <a className="external commision">
                <img src={ech2020} alt="ECH2020.png" />
            </a>
        </div>
    )
};

export default Footer;