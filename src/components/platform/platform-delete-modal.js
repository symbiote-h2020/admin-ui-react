import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import { DEACTIVATE_PLATFORM_DELETE_MODAL } from "../../actions";

const PlatformDeleteModal = ({ platform, deleteModalOpen, closeModal, handleDeletePlatform }) => {

    const handleCloseModal = () => {
        closeModal(DEACTIVATE_PLATFORM_DELETE_MODAL);
    };

    // This function is used in order to preserve the animation on closing the modal
    const modalContent = () => {
        return(
            platform ?
                <Fragment>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete the platform
                            <strong> {platform.name}</strong>?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4 className="text-danger">Warning - if you delete this platform, some information may be lost!</h4>
                        <p>(During release 1.1.0, make sure you have deleted all registered resources)</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" bsStyle="danger"
                                onClick={handleDeletePlatform}>Verify Deletion</Button>
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

export default PlatformDeleteModal;