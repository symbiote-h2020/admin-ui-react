import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import { DEACTIVATE_ClIENT_DELETE_MODAL } from "../../actions";

const ClientDeleteModal = ({ clientId, deleteModalOpen, closeModal, handleDeleteClient }) => {

    const handleCloseModal = () => {
        closeModal(DEACTIVATE_ClIENT_DELETE_MODAL);
    };

    // This function is used in order to preserve the animation on closing the modal
    const modalContent = () => {
        return(
            clientId ?
                <Fragment>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to revoke the certificate of the client with id
                            <strong> {clientId}</strong>?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button type="button" bsStyle="danger"
                                onClick={handleDeleteClient}>Verify Revocation</Button>
                        <Button type="button" bsStyle="default"
                                onClick={handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Fragment> :
                null
        );
    };

    return(
        <Modal show={deleteModalOpen} onHide={handleCloseModal}>
            {modalContent()}
        </Modal>
    );
};

export default ClientDeleteModal;