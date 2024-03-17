import { useEffect, useState } from 'react';
import {Button, Form, Row, Card, Spinner} from 'react-bootstrap';
import { format } from 'date-fns';

import { getProfile } from '../utils/api/requests';
import { putProfile } from '../utils/api/requests';

function ProfilePage () {
    
    const [validated, setValidated] = useState(false);
    const [patchError, setErrors] = useState('');
    const [data, setData] = useState(null);
    const [maxDate, setMaxDate] = useState(new Date().toISOString().split('T')[0]);
    const [minDate, setMinDate] = useState('1900-01-01');
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        async function getUserProfile(){
            const response = await getProfile();
            console.log(response);
            setData(response.data);
            isLoading(false);
        }
        getUserProfile();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
          setValidated(true);
        } else {
            setValidated(true);
            try{
                await putProfile( {
                    fullName: event.target.fullName.value,
                    birthDate: event.target.birthDate.value
                } );
                window.location.reload();
            }
            catch (error) {
                setErrors(error);
            }
        }
    };

    const formattedBirthDate = data?.birthDate ? format(new Date(data.birthDate), 'yyyy-MM-dd') : '';

    return (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center"> 
        {
            loading ? (
                <Spinner animation="border" />
            ) : (
                <Card className='w-75' style={{maxWidth:'33em'}}>
                    <Card.Body>
                        <Card.Title><h2>Профиль</h2></Card.Title>
                        <h6 className="text-danger mt-3">{patchError}</h6>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group controlId="fullName">
                                    <Form.Label>ФИО</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Иванов Иван Иванович"
                                        defaultValue={data?.fullName??""}
                                        required
                                        name="fullName" />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, введите имя.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email"
                                        placeholder="user@example.com" 
                                        defaultValue={data?.email??""}
                                        required
                                        disabled
                                        readOnly
                                        name="email" />
                                    <Form.Control.Feedback type="invalid">
                                        Не соответствует формату Email.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group controlId="birthDate">
                                    <Form.Label>Дата рождения</Form.Label>
                                    <Form.Control
                                    type="date"
                                    placeholder="14.03.2005"
                                    defaultValue={formattedBirthDate}
                                    required
                                    name="birthDate"
                                    max={maxDate}
                                    min={minDate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Пожалуйста, введите дату в диапазоне от {minDate} до {maxDate}.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            <div className="d-grid mt-2">
                                <Button type='submit' variant="primary">
                                    Сохранить
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            )
        }
        </div>
    );
}

export default ProfilePage;