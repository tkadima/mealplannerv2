import React, { ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';

type PropTypes = {
    show: boolean; 
    title: string; 
    children: ReactNode;
    onHide: () => void; 
}

const ModalWrapper = ({show, title, children, onHide } : PropTypes) => {
    return (<Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        {
            <Modal.Title>{title}</Modal.Title>
        }
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
    </Modal>);
}

export default ModalWrapper;