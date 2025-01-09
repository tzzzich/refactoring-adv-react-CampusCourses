import { useState } from "react";
import { Button, Form, Row, Card } from "react-bootstrap";

import Password from "../components/ui/Password";
import { register } from "../utils/api/requests";

function RegistrationPage() {
  const [validated, setValidated] = useState(false);
  const [error, setErrors] = useState("");
  const [maxDate, setMaxDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [minDate, setMinDate] = useState("1900-01-01");

  localStorage.setItem("token", null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      try {
        await register({
          fullName: event.target.fullName.value,
          email: event.target.email.value,
          password: event.target.password.value,
          birthDate: event.target.birthDate.value,
          confirmPassword: event.target.confirmPassword.value,
        });
        window.location.href = "/";
      } catch (error) {
        setErrors(error);
      }
    }
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <Card className="w-75" style={{ maxWidth: "33em" }}>
        <Card.Body>
          <Card.Title>
            <h2>Регистрация</h2>
          </Card.Title>
          <h6 className="text-danger mt-3">{error}</h6>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group controlId="fullName">
                <Form.Label>ФИО</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Иванов Иван Иванович"
                  required
                  name="fullName"
                />
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
                  required
                  name="email"
                />
                <Form.Control.Feedback type="invalid">
                  Не соответствует формату Email.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="birthDate">
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="14.03.2005"
                  required
                  name="birthDate"
                  max={maxDate}
                  min={minDate}
                />
                <Form.Control.Feedback type="invalid">
                  Пожалуйста, введите дату в диапазоне от {minDate} до {maxDate}
                  .
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Password name="password" labelName="Пароль" id="1" />
            </Row>
            <Row className="mb-3">
              <Password
                name="confirmPassword"
                labelName="Подтвердите пароль"
                id="2"
              />
            </Row>
            <div className="d-grid mt-2">
              <Button type="submit" variant="primary">
                Зарегистрироваться
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RegistrationPage;
