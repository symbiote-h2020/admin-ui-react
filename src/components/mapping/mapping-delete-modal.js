import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";

const MappingDeleteModal = ({ mapping, deleteModalOpen, closeDeleteModal, handleDeleteMapping }) => {

    // This function is used in order to preserve the animation on closing the modal
    const modalContent = () => {
        return(
            mapping ?
                <Fragment>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete the mapping
                            <strong> {mapping.name}</strong>?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button type="button" bsStyle="danger"
                                onClick={handleDeleteMapping}>Verify Deletion</Button>
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

export default MappingDeleteModal;