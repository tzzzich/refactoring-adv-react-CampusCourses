import { useState } from 'react';
import {Button, Form, Row, Card} from 'react-bootstrap';
import Password from '../components/ui/Password';

import { login } from '../utils/api/requests';

function LoginPage() {
    
    const [validated, setValidated] = useState(false);
    const [error, setErrors] = useState('')

    localStorage.setItem("token", null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
          setValidated(true);
        } else {
            setValidated(true);
            try{
                await login({
                    email: event.target.email.value,
                    password: event.target.password.value,
                });
                window.location.href = "/";
            }
            catch(error) {
                setErrors(error);
                setValidated(false);
            }
        }
    };

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center"> 
        <Card className='w-75' style={{maxWidth:'33em'}}>
            <Card.Body>
                <Card.Title><h2>Вход</h2></Card.Title>
                <h6 className="text-danger mt-3">{error}</h6>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email"
                                placeholder="user@example.com" required
                                name="email" />
                            <Form.Control.Feedback type="invalid">
                                Не соответствует формату Email.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Password name="password" labelName="Пароль" id="1"/>
                    </Row>
                    <div className="d-grid gap-2">
                        <Button type='submit' variant="primary">
                            Войти
                        </Button>
                        <Button href="/registration" variant="secondary">
                            Регистрация
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    </div>
  );
}

export default LoginPage;