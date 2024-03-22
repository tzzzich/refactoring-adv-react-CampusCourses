import Modal from 'react-bootstrap/Modal';


const ModalBase = ({ show, onClose,
    title, bodyChildren, footerChildren }) => {


    return (
        <Modal
            show={show}
            onHide={onClose}
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyChildren}</Modal.Body>
            <Modal.Footer>
                {footerChildren}
            </Modal.Footer>
        </Modal>
    )
}

export default ModalBase