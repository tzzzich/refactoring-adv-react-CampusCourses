import { Form, Row } from "react-bootstrap";
import { useState } from "react";

const CourseStatusEditForm = ({ handleSubmit, validated, course }) => {
  const [statusData, setstatusData] = useState(course.status);

  const handleStatusChange = (event) => {
    setstatusData(event.target.value);
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        id={"courseStatusEditForm"}
      >
        <Row className="mb-3">
          <Form.Group controlId="status">
            <div>
              {course.status == "Created" && (
                <Form.Check
                  inline
                  label="Открыт для записи"
                  value="OpenForAssigning"
                  name="status"
                  type="radio"
                  id={`status-radio-1`}
                  onChange={handleStatusChange}
                />
              )}
              {!(course.status == "Started" || course.status == "Finished") && (
                <Form.Check
                  inline
                  label="В процессе обучения"
                  value="Started"
                  name="status"
                  type="radio"
                  id={`status-radio-1`}
                  onChange={handleStatusChange}
                />
              )}
              {!(course.status == "Finished") && (
                <Form.Check
                  inline
                  label="Закрыт"
                  value="Finished"
                  name="status"
                  type="radio"
                  id={`status-radio-1`}
                  onChange={handleStatusChange}
                />
              )}
              {validated == true && !statusData && (
                <div>
                  <Form.Text className="text-danger">
                    Пожалуйста, выберите значение.
                  </Form.Text>
                </div>
              )}
            </div>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
};

export default CourseStatusEditForm;
