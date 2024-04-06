import { Form, Row} from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../utils/api/requests';
import RichTextFormControl from '../ui/RichTextFormControl'


const CourseFullInfoForm = ({handleSubmit, validated}) => {

    const getAllUsersQuery = useQuery({
        queryKey: ['users'],
        queryFn: () =>getAllUsers(), 
        select: ({ data }) => {
            console.log(data)
            return data.map((user) => (
                <option value={user.id}>{user.fullName}</option>
            ));
        }
    });

    return (
        <>

            <Form noValidate validated={validated} onSubmit={handleSubmit} id={'courseFullInfoForm'}>
                <Row className="mb-3">
                    <Form.Group controlId="name">
                        <Form.Label>Название курса</Form.Label>
                        <Form.Control 
                            type="text"
                            required
                            defaultValue={''}
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
                            defaultValue={''}
                            min={1900}
                            name="startYear" />
                        <Form.Control.Feedback type="invalid">
                            Требуется ввести значение не меньше 1900.
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
                            defaultValue={''}
                            name="maximumStudentsCount" />
                        <Form.Control.Feedback type="invalid">
                            Требуется ввести значение не меньше 0.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="semester">
                        <Form.Label>Семестр</Form.Label>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                                inline
                                label="Осенний"
                                value="Autumn"
                                name="semester"
                                type='radio'
                                id={`semester-radio-1`}
                            />
                            <Form.Check
                                inline
                                label="Весенний"
                                value="Spring"
                                name="semester"
                                type='radio'
                                id={`semester-radio-2`}
                            />
                        </div>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <RichTextFormControl controlId="requirements" label="Требования" />
                </Row>
                <Row className="mb-3">
                    <RichTextFormControl 
                        controlId="annotations" 
                        label="Аннотации" 
                        required
                        validated={validated}
                    />
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="mainTeacherId">
                        <Form.Label>Основной преподаватель курса</Form.Label>
                        <Form.Select aria-label="mainTeacherId">
                            {getAllUsersQuery.isLoading ? (<option>Загрузка</option>) : getAllUsersQuery.data}
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Form>
        </>
    )
}

export default CourseFullInfoForm