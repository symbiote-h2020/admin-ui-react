import React from "react";

const ModalButton = ({id, extraClasses, target, text}) => {

    const getClassName = () => {
        const className = "btn btn-info btn-default";
        return extraClasses ? `${className} ${extraClasses}` : className;
    };

    return(
        <button type="button" id={id} className={getClassName()} data-toggle="modal"
                data-target={target}>{text}
                </button>
    );
};

export default ModalButton;