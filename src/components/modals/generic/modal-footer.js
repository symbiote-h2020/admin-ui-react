import React from "react";

const ModalFooter = (props) => {

    const getDynamicProps = () => {
        let dynamicProps = {};

        if (props.id)
            dynamicProps["id"] = props.id;

        return dynamicProps;
    };

    return(
        <div className="modal-footer" {...getDynamicProps()}>
            {props.children}
        </div>
    );
};

export default ModalFooter;