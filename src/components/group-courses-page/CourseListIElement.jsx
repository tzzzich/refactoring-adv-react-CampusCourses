import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { Button, ListGroup, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteCourse } from '../../utils/api/requests';
import CourseDeleteModal from './CourseDeleteModal';

const CourseListElement = ({course, refetch}) => {

    const semester = course.semester == 'Autumn' ? 'Осенний' : 'Весенний';
    const [statusTextColor, setStatusTextColor] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const setStatus = useCallback(() => {
        switch (course.status) {
            case "OpenForAssigning":
                setStatusTextColor('text-success');
                setStatusMessage('Открыт для записи');
                break;
            case "Started":
                setStatusTextColor('text-primary');
                setStatusMessage('В процессе обучения');
                break;
            case "Finished":
                setStatusTextColor('text-danger');
                setStatusMessage('Закрыт');
                break;
            case "Created":
                setStatusTextColor('text-secondary');
                setStatusMessage('Создан');
                break;
            default:
                setStatusTextColor('');
                setStatusMessage(course.status);
                break;
        }
    }, [course.status]);

    useEffect(() => {
        setStatus();
    }, [setStatus]);

    const [showCourseDeleteModal, setShowCourseDeleteModal] = useState(false);

    const toggleCourseDeleteModal = () => {
        setShowCourseDeleteModal(!showCourseDeleteModal);
    }

    const handleDelete = async (event) => {
        try{
            await deleteCourse(course.id);
            refetch();
            toggleCourseDeleteModal();
            swal("Успешно!", "Курс удалён!", "success");
        }
        catch (error) {
            console.log(error);
        }
    }
      
    return (
        <>
            <ListGroup.Item
                className="d-flex justify-content-between align-items-start"
            >
                <Link to={`/courses/${course.id}`} style={{ textDecoration: 'none', color: 'black' }} className='mt-2 text-break'>
                        <div className="ms-2 me-auto">
                            <h4 className="text-break">{course.name}</h4>
                            <div>Учебный год - {course.startYear}-{course.startYear + 1}</div>
                            <div>Семестр - {semester}</div>
                            <div className='text-muted'>Мест всего - {course.maximumStudentsCount}</div>
                            <div className='text-muted'>Мест свободно - {course.remainingSlotsCount}</div>
                        </div> 
                </Link>

                <div className="ms-2 ">
                    <div className="d-flex justify-content-end align-items-start">
                    <strong className={statusTextColor}>{statusMessage}</strong>
                    </div>
                    <div className="d-flex justify-content-end align-items-end">
                    <Button variant="danger" className="m-1" onClick={toggleCourseDeleteModal} style={{width: '8em', alignSelf: 'flex-end'}} >
                        УДАЛИТЬ
                    </Button>
                    </div>
                </div>
                    
                

            </ListGroup.Item>
            <CourseDeleteModal
                toggleCourseDeleteModal={toggleCourseDeleteModal}
                showCourseDeleteModal={showCourseDeleteModal}
                handleDelete={handleDelete}
            />
        </>
    )
  }
  
  export default CourseListElement