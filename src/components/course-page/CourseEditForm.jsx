import { Form, Row} from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../utils/api/requests';
import RichTextFormControl from '../ui/RichTextFormControl'
import { useState } from 'react';


const CourseEditForm = ({handleSubmit, validated, isAdmin, canEdit, course}) => {

    const [semesterData, setSemesterData] = useState(course.semester);

    

    const handleSemesterChange = (event) => {
        setSemesterData(event.target.value);
    }

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit} id={'courseEditForm'}>
            {
                isAdmin?
                (
                    <>
                        <Row className="mb-3">
                            <Form.Group controlId="name">
                                <Form.Label>Название курса</Form.Label>
                                <Form.Control 
                                    type="text"
                                    required
                                    defaultValue={course.name}
                                    name="name" />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, введите название курса.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group controlId="startYear">
                                <Form.Label>Год начала курса</Form.Label>
                                <Form.Control 
                                    type="number"
                                    required
                                    defaultValue={course.startYear}
                                    min={2000}
                                    max={2029}
                                    name="startYear" />
                                <Form.Control.Feedback type="invalid">
                                    Требуется ввести значение между 2000 и 2029.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group controlId="maximumStudentsCount">
                                <Form.Label>Общее количество мест</Form.Label>
                                <Form.Control 
                                    type="number"
                                    min={0}
                                    required
                                    defaultValue={course.maximumStudentsCount}
                                    name="maximumStudentsCount" />
                                <Form.Control.Feedback type="invalid">
                                    Требуется ввести значение не меньше 0.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group controlId="semester">
                                <Form.Label>Семестр</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        label="Осенний"
                                        value="Autumn"
                                        name="semester"
                                        type='radio'
                                        id={`semester-radio-1`}
                                        defaultChecked={course.semester === "Autumn"}
                                        onChange={handleSemesterChange}
                                    />
                                    <Form.Check
                                        inline
                                        label="Весенний"
                                        value="Spring"
                                        name="semester"
                                        type='radio'
                                        required
                                        id={`semester-radio-2`}
                                        defaultChecked={course.semester === "Spring"}
                                        onChange={handleSemesterChange}
                                    />
                                    {
                                        validated==true && !semesterData && (
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
                    </>
                )
                :
                null
            }
                <Row className="mb-3">
                    <RichTextFormControl 
                        controlId="requirements" 
                        label="Требования" 
                        defaultValue={course.requirements}
                    />
                    
                </Row>
                <Row className="mb-3">
                    <RichTextFormControl 
                        controlId="annotations" 
                        label="Аннотации"
                        defaultValue={course.annotations}
                    />
                </Row>
                {
                    
                }
                
            </Form>
        </>
    )
}

export default CourseEditForm