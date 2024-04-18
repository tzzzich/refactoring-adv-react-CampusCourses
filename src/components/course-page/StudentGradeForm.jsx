import { Form, Row} from 'react-bootstrap'
import { useState } from 'react';


const StudentGradeForm = ({validated, onSubmit, student}) => {

    const [gradeData, setGradeData] = useState(null);


    const handleGradeChange = (event) => {
        setGradeData(event.target.value);
    }

    return (
        <>
            <Form noValidate validated={validated} onSubmit={onSubmit} id={'studentGradeForm'}>
                    <Row className="mb-3">
                        <Form.Group controlId="mark">
                            <Form.Label>Студент - {student.name}</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    label="Пройдено"
                                    value="Passed"
                                    name="mark"
                                    type='radio'
                                    id={`grade-radio-1`}
                                    onChange={handleGradeChange}
                                />
                                <Form.Check
                                    inline
                                    label="Зафейлено"
                                    value="Failed"
                                    name="mark"
                                    type='radio'
                                    required
                                    id={`grade-radio-2`}
                                    onChange={handleGradeChange}
                                />
                                {
                                    validated==true && !gradeData && (
                                        <div>
                                            <Form.Text className='text-danger'>
                                                Пожалуйста, выберите значение.
                                            </Form.Text>
                                        </div>
                                    )
                                }
                                
                            </div>
                        </Form.Group>
                    </Row>
            </Form>
        </>
    )
}

export default StudentGradeForm