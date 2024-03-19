import Nav from 'react-bootstrap/Nav';
import {logout} from '../../utils/api/requests';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const LogoutBttn = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = async (event) => {
        try{
            await logout();
            window.location.href = "/login";
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>
        <Nav.Link onClick={handleShow}>Выход</Nav.Link>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Подтверждение</Modal.Title>
            </Modal.Header>
            <Modal.Body>Вы действительно хотите выйти?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отменить
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                    Выйти
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
  
export default LogoutBttn
