import Nav from 'react-bootstrap/Nav';
import {deleteGroup, logout} from '../../utils/api/requests';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const GroupDeleteBttn = ({id}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async (event) => {
        try{
            await deleteGroup(id);
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>
        <Button variant="danger" className="m-1" onClick={handleShow}>
            УДАЛИТЬ
        </Button>

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
            <Modal.Body>Вы действительно хотите удалить группу?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отменить
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
  
export default GroupDeleteBttn
