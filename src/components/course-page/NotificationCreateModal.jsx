import { Button, Form, Row} from 'react-bootstrap'
import ModalBase from '../ui/ModalBase';


const NotificationCreateModal = ({show, onClose, handleSubmit,
    validated}) => {

   return (
       <>
           <ModalBase 
               title={(<strong>Создание уведомления</strong>)}
               show={show}
               onClose={onClose}
               bodyChildren ={(
                <Form noValidate validated={validated} onSubmit={handleSubmit} id={'notificationCreateForm'}>
                    <Row className="mb-3">
                        <Form.Group controlId="text">
                            <Form.Control 
                                as="textarea"
                                required
                                rows={3}
                                name="text" />
                            <Form.Control.Feedback type="invalid">
                                Пожалуйста, введите текст уведомления.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                    <Form.Group controlId="isImportant">
                        <Form.Check
                        label="Важное уведомление"
                        name="isImportant"
                        />
                    </Form.Group>
                    </Row>
                </Form>
               )}
               footerChildren ={(
                   <>
                       <Button variant="secondary" onClick={onClose}>
                           Отменить
                       </Button>
                       <Button type="submit" form={'notificationCreateForm'}>
                           Сохранить
                       </Button>
                   </>
               )}
           />
           
       </>
   )
}

export default NotificationCreateModal