import { Form, Row} from 'react-bootstrap'


const GroupNamingForm = ({handleSubmit, defaultName, validated}) => {

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit} id={'groupNamingForm'}>
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
            </Form>
        </>
    )
}

export default GroupNamingForm