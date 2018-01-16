import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";

const FederationDeleteModal = ({ federation, deleteModalOpen, closeModal, handleDeleteFederation }) => {

    // This function is used in order to preserve the animation on closing the modal
    const modalContent = () => {
        return(
            federation ?
                <Fragment>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete the federation with id
                            <strong> {federation.federationId}</strong>?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button type="button" bsStyle="danger"
                                onClick={handleDeleteFederation}>Verify Deletion</Button>
                        <Button type="button" bsStyle="default"
                                onClick={closeModal}>Close</Button>
                    </Modal.Footer>
                </Fragment> :
                null
        );
    };

    return(
        <Modal show={deleteModalOpen} onHide={closeModal}>
            {modalContent()}
        </Modal>
    );
};

export default FederationDeleteModal;