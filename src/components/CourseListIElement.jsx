import { ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseListElement = ({course}) => {

    const semester = course.semester == 'Autumn' ? 'Осенний' : 'Весенний';
    let statusTextColor;
    let statusMessage;

    switch (course.status) {
        case "OpenForAssigning":{
            statusTextColor = 'text-success';
            statusMessage = 'Открыт для записи';
            break;
        }
        case "Started": {
            statusTextColor = 'text-primary'
            statusMessage = 'В процессе обучения'
            break;
        }
        case "Finished":{
            statusTextColor = 'text-danger'
            statusMessage = 'Закрыт'
            break;
        }
        case "Created":{
            statusTextColor = 'text-secondary'
            statusMessage = 'Создан'
            break;
        }
        default:{
            statusTextColor = ''
            statusMessage = course.status
            break;
        }
    }
      
    return (
        <>
            <ListGroup.Item
                action 
                className="d-flex justify-content-between align-items-start"
            >
                <Link to={`/courses/${course.id}`} style={{ textDecoration: 'none', color: 'black' }} className='mt-2'>
                        <div className="ms-2 me-auto">
                            <h4>{course.name}</h4>
                            <div>Учебный год - {course.startYear}-{course.startYear + 1}</div>
                            <div>Семестр - {semester}</div>
                            <div className='text-muted'>Мест всего - {course.maximumStudentsCount}</div>
                            <div className='text-muted'>Мест свободно - {course.remainingSlotsCount}</div>
                        </div> 
                </Link>

                <strong className={statusTextColor}>{statusMessage}</strong>

            </ListGroup.Item>
        </>
    )
  }
  
  export default CourseListElement