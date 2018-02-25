import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";

const FederationLeaveModal = ({ federation, platformId, leaveModalOpen, closeModal, handleLeaveFederation }) => {

    // This function is used in order to preserve the animation on closing the modal
    const modalContent = () => {
        return(
            federation ?
                <Fragment>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want the platform with id <strong>{platformId} </strong>
                            to leave the federation <strong>{federation.federationId}</strong>?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button type="button" bsStyle="danger"
                                onClick={handleLeaveFederation}>Verify Deletion</Button>
                        <Button type="button" bsStyle="default"
                                onClick={closeModal}>Close</Button>
                    </Modal.Footer>
                </Fragment> :
                null
        );
    };

    return(
        <Modal show={leaveModalOpen} onHide={closeModal}>
            {modalContent()}
        </Modal>
    );
};

export default FederationLeaveModal;