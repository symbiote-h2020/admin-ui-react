import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";

const HandleFederationInvitationModal = ({ federationId, platformId, accept, modalOpen, closeModal, handleFederationInvitation }) => {

    // This function is used in order to preserve the animation on closing the modal
    const modalContent = () => {
        return(
            <Fragment>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to <strong>{accept ? "accept" : "reject"}</strong> having the
                        platform with id <strong>{platformId}</strong> joining the federation <strong>{federationId}</strong>?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button type="button" bsStyle="warning"
                            onClick={handleFederationInvitation}>Verify</Button>
                    <Button type="button" bsStyle="default"
                            onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Fragment>
        );
    };

    return(
        <Modal show={modalOpen} onHide={closeModal}>
            {modalContent()}
        </Modal>
    );
};

export default HandleFederationInvitationModal;