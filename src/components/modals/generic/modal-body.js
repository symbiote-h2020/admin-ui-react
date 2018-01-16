import React from "react";

const ModalBody = (props) => {

    const getDynamicProps = () => {
        let dynamicProps = {};

        if (props.id)
            dynamicProps["id"] = props.id;

        return dynamicProps;
    };

    return(
      <div className="modal-body" {...getDynamicProps()}>
          {props.children}
      </div>
    );
};

export default ModalBody;