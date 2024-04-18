import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {Tab, Tabs, ListGroup, Button} from 'react-bootstrap';
import { addCourseTeacher, getAllUsers } from '../../utils/api/requests';
import TeacherAddModal from './AddCourseTeacherModal';
import StudentListElement from './StudentListElement';
import TeacherListElement from './TeacherListElement';

function CourseParticipantsTab({course, isAdmin, isMainTeacher, isStudent, isTeacher, setSavedCourse}) {

    const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
    const [teacherAddValidated, setTeacherAddValidated] = useState(false);

    const toggleTeacherAddModal = () => {
        setShowAddTeacherModal(!showAddTeacherModal);
    }

    const handleTeacherAddSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
          setTeacherAddValidated(true);
        } else {
            setTeacherAddValidated(true);
            try{
                const response = await addCourseTeacher( course.id, {
                    userId: event.target.teacherId.value
                })
                setSavedCourse(response.data)
                setTeacherAddValidated(false);
                toggleTeacherAddModal();
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="mt-5 mb-5" border="light">
                    <Tabs
                    defaultActiveKey="teachers"
                    id="course-participants-tab"
                    justify
                    >
                        <Tab eventKey="teachers" title="Преподаватели">
                            <div className="border border-top-0 rounded-bottom-1">
                                <div className="p-4">
                                    {(isAdmin || isMainTeacher) &&<div><Button className="mb-3" onClick={toggleTeacherAddModal}>ДОБАВИТЬ ПРЕПОДАВАТЕЛЯ</Button></div>}
                                    <ListGroup >
                                        {course.teachers.map((teacher) =>
                                            <TeacherListElement teacher={teacher} key={teacher.email}/>
                                        )}
                                    </ListGroup>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="students" title="Студенты">
                            <div className="border border-top-0 rounded-bottom-1">
                                <div className="p-4">
                                    <ListGroup >
                                        {course.students.map((student) =>
                                            <StudentListElement course={course} student={student} key={student.id} isAdmin={isAdmin}
                                            isTeacher={isTeacher} isMainTeacher={isMainTeacher} isStudent={isStudent} setSavedCourse={setSavedCourse}/> 
                                        )}
                                    </ListGroup>
                                </div>
                            </div>
                        </Tab>
                        
                    </Tabs>
            <TeacherAddModal show={showAddTeacherModal} onClose={toggleTeacherAddModal} 
                handleSubmit={handleTeacherAddSubmit} validated={teacherAddValidated} course={course}
            />                                
        </div>
    );
}

export default CourseParticipantsTab;