import { useQuery } from '@tanstack/react-query';
import { Button, Form, Row} from 'react-bootstrap'
import { getAllUsers } from '../../utils/api/requests';
import ModalBase from '../ui/ModalBase';


const TeacherAddModal = ({show, onClose, handleSubmit,
    validated, course}) => {

        const getPotentialUsersQuery = useQuery({
            queryKey: ['users'],
            queryFn: () =>getAllUsers(), 
            select: ({ data }) => {
                const potentialUsers = data.filter(user => {
                    const isTeacher = course.teachers.some(teacher => teacher.name === user.fullName);
                    const isStudent = course.students.some(student => student.name === user.fullName);
                    return !isTeacher && !isStudent;
                });
                return potentialUsers.map((user) => (
                    <option key={user.id}value={user.id}>{user.fullName}</option>
                ));
            }
        });
        

   return (
       <>
           <ModalBase 
               title={(<strong>Добавление преподавателя на курс</strong>)}
               show={show}
               onClose={onClose}
               bodyChildren ={(
                <Form noValidate validated={validated} onSubmit={handleSubmit} id={'teacherAddForm'}>
                    <Row className="mb-3">
                        <Form.Group controlId="teacherId">
                            <Form.Label>Выберите преподавателя</Form.Label>
                            <Form.Select aria-label="teacherId">
                                {getPotentialUsersQuery.data}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Form>
               )}
               footerChildren ={(
                   <>
                       <Button variant="secondary" onClick={onClose}>
                           Отменить
                       </Button>
                       <Button type="submit" form={'teacherAddForm'}>
                           Сохранить
                       </Button>
                   </>
               )}
           />
           
       </>
   )
}

export default TeacherAddModal