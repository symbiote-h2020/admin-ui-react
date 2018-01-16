import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";

const InfoModelDeleteModal = ({ infoModel, deleteModalOpen, closeDeleteModal, handleDeleteInfoModel }) => {

    // This function is used in order to preserve the animation on closing the modal
    const modalContent = () => {
        return(
            infoModel ?
                <Fragment>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete the information model
                            <strong> {infoModel.name}</strong>?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button type="button" bsStyle="danger"
                                onClick={handleDeleteInfoModel}>Verify Deletion</Button>
                        <Button type="button" bsStyle="default"
                                onClick={closeDeleteModal}>Close</Button>
                    </Modal.Footer>
                </Fragment> :
                null
        );
    };

    return(
        <Modal show={deleteModalOpen} onHide={closeDeleteModal}>
            {modalContent()}
        </Modal>
    );
};

export default InfoModelDeleteModal;