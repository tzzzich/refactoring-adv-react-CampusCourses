import { Button, Modal, Form, InputGroup, Row} from 'react-bootstrap'
import { useState } from 'react';
import { putGroup, postGroup } from '../../utils/api/requests';

const GroupChangeBttn = ({id, isCreate, defaultName}) => {
    const [show, setShow] = useState(false);
    const [error, setErrors] = useState('');
    const [validated, setValidated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const variant = isCreate ? 'primary' : 'warning'
    const bttnText = isCreate ? 'Создать' : 'РЕДАКТИРОВАТЬ'
    const modalText = isCreate ? 'Создание' : 'Редактирование'

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
          setValidated(true);
        } else {
            setValidated(true);
            try{
                isCreate ? 
                await postGroup( {
                    name: event.target.name.value
                })
                :
                await putGroup( {
                    name: event.target.name.value
                }, id )
                window.location.reload();
            }
            catch (error) {
                setErrors(error);
            }
        }
    };

    return (
        <>
            <Button variant={variant} className="m-1" onClick={handleShow}>
                {bttnText}
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
                    <Modal.Title>{modalText} группы</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    
                    <Row className="mb-3">
                        <Form.Group controlId="name">
                            <Form.Label>Название группы</Form.Label>
                            <Form.Control 
                                type="text"
                                required
                                defaultValue={defaultName}
                                name="name" />
                            <Form.Control.Feedback type="invalid">
                                Пожалуйста, введите название группы.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button type="submit">
                        Сохранить
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default GroupChangeBttn