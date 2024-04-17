import { useState } from 'react';
import { ListGroup, Card, Button} from 'react-bootstrap';
import { editCourse, editRequirementsAndAnnotationsCourse } from '../../utils/api/requests';
import CourseEditModal from './CourseEditModal';

function CourseDetail({course, isAdmin}) {

  console.log(course)

  const [showCourseEditModal, setShowCourseEditModal] = useState(false);
  const [courseEditValidated, setCourseEditValidated] = useState(false);

  const handleCourseEditSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
        setCourseEditValidated(true);
      } else {
          setCourseEditValidated(true);
          try{
              isAdmin? 
                await editCourse( {
                    name: event.target.name.value,
                    startYear: event.target.startYear.value,
                    maximumStudentsCount: event.target.maximumStudentsCount.value,
                    semester: event.target.semester.value,
                    requirements: event.target.requirements.value,
                    annotations: event.target.annotations.value,
                    mainTeacherId: event.target.mainTeacherId.value
                }, course.id )
              :
              await editRequirementsAndAnnotationsCourse( {
                  requirements: event.target.requirements.value,
                  annotations: event.target.annotations.value
              }, course.id )
              //window.location.reload();
          }
          catch (error) {
              console.log(error);
          }
      }
  };
  
  function toggleCourseEditModal () {
    setShowCourseEditModal(!showCourseEditModal);
  }

  

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
    <div className="mt-2">
      <span className="d-flex justify-content-between align-items-end">
        <h5>Основные данные курса</h5>
        <Button variant="warning" className="mb-2" onClick={toggleCourseEditModal}>РЕДАКТИРОВАТЬ</Button>
      </span>
      <Card >
        <ListGroup variant="flush" className="w-100">
          <ListGroup.Item
              action 
              className="d-flex justify-content-between align-items-stretch"
          >
            <div className="ms-2 me-auto">
              <strong>Статус курса</strong>
              <div className={statusTextColor}>{statusMessage}</div>
            </div>
            <div  className="d-flex align-items-stretch">
             <Button variant="warning" className="flex-grow-1">ИЗМЕНИТЬ</Button>
            </div>
          </ListGroup.Item>
          <ListGroup.Item
                      action 
                      className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <strong>Учебный год</strong>
                      <div >{course.startYear} - {course.startYear + 1}</div>
                    </div>
                    <div className="ms-2 me-auto">
                      <strong>Семестр</strong>
                      <div >{course.semester == "Spring" ? 'Весенний' : 'Осенний'}</div>
                    </div>
          </ListGroup.Item>
          <ListGroup.Item
                      action 
                      className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <strong>Всего мест</strong>
                      <div >{course.maximumStudentsCount}</div>
                    </div>
                    <div className="ms-2 me-auto">
                      <strong>Студентов зачислено</strong>
                      <div >{course.studentsEnrolledCount}</div>
                    </div>
          </ListGroup.Item>
          <ListGroup.Item
                      action 
                      className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <strong>Заявок на рассмотрении</strong>
                      <div >{course.studentsInQueueCount}</div>
                    </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <CourseEditModal show={showCourseEditModal} onClose={toggleCourseEditModal} 
        onSubmit={handleCourseEditSubmit} validated={courseEditValidated} 
        isAdmin={isAdmin} course={course}
        />

    </div>
  );
}

export default CourseDetail;