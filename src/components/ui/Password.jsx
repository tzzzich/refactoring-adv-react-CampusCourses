import { useState } from "react";
import { Form } from "react-bootstrap";

const Password = ({ name, labelName, id }) => {
  const [passwordError, setPasswordError] = useState(
    "Пожалуйста, введите пароль."
  );

  const validatePassword = (event) => {
    const passwordInput = event.target;
    if (passwordInput.validity.valueMissing) {
      setPasswordError("Пожалуйста, введите пароль.");
    } else if (passwordInput.validity.tooShort) {
      setPasswordError("Пароль должен быть длиной не менее 6 символов.");
    } else if (passwordInput.validity.patternMismatch) {
      setPasswordError("Пароль должен содержать цифру.");
    } else {
      setPasswordError("");
    }
  };

  const passwordId = "password" + id;

  return (
    <Form.Group controlId={passwordId}>
      <Form.Label>{labelName}</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        minLength="6"
        pattern="^(?=.*\d).*$"
        onChange={validatePassword}
        required
        name={name}
      />
      <Form.Control.Feedback type="invalid">
        {passwordError}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Password;
