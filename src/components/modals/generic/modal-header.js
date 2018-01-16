import React from "react";

const ModalHeader = (props) => {

    const getDynamicProps = () => {
        let dynamicProps = {};

        if (props.id)
            dynamicProps["id"] = props.id;

        return dynamicProps;
    };

    return (
        <div className="modal-header" {...getDynamicProps()}>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h3 className="modal-title">{props.title}</h3>
        </div>
    );
};

export default ModalHeader;