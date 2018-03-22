import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import { DEACTIVATE_SSP_DELETE_MODAL } from "../../actions/index";

const SSPDeleteModal = ({ ssp, deleteModalOpen, closeModal, handleDeleteSSP }) => {

    const handleCloseModal = () => {
        closeModal(DEACTIVATE_SSP_DELETE_MODAL);
    };

    // This function is used in order to preserve the animation on closing the modal
    const modalContent = () => {
        return(
            ssp ?
                <Fragment>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete the ssp
                            <strong> {ssp.name}</strong>?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4 className="text-danger">Warning - if you delete this ssp, some information may be lost!</h4>
                        <p>(During release 2.0, make sure you have deleted all registered resources)</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" bsStyle="danger"
                                onClick={handleDeleteSSP}>Verify Deletion</Button>
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

export default SSPDeleteModal;