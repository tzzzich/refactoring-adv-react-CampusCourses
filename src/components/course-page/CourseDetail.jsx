import { useState } from 'react';
import { ListGroup, Card, Button} from 'react-bootstrap';
import { changeCourseStatus, editCourse, editRequirementsAndAnnotationsCourse, signUpForCourse } from '../../utils/api/requests';
import CourseEditModal from './CourseEditModal';
import CourseStatusEditModal from './CourseStatusEditModal';

function CourseDetail({course, isAdmin, isTeacher, isMainTeacher, isStudent, setSavedCourse}) {


  console.log(course)

  const [showCourseEditModal, setShowCourseEditModal] = useState(false);
  const [courseEditValidated, setCourseEditValidated] = useState(false);

  function toggleCourseEditModal () {
    setShowCourseEditModal(!showCourseEditModal);
  }

  const handleCourseEditSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
        setCourseEditValidated(true);
      } else {
          setCourseEditValidated(true);
          try{
              if (isAdmin){
                const response = await editCourse( {
                    name: event.target.name.value,
                    startYear: event.target.startYear.value,
                    maximumStudentsCount: event.target.maximumStudentsCount.value,
                    semester: event.target.semester.value,
                    requirements: event.target.requirements.value,
                    annotations: event.target.annotations.value,
                    mainTeacherId: course.mainTeacherId
                }, course.id );
                setSavedCourse(response);
              }
              else {
              const response = await editRequirementsAndAnnotationsCourse( {
                  requirements: event.target.requirements.value,
                  annotations: event.target.annotations.value
              }, course.id )
              setSavedCourse(response);
            }
              setCourseEditValidated(false);
              toggleCourseEditModal();
          }
          catch (error) {
              console.log(error);
          }
      }
  };
  

  const [showCourseStatusEditModal, setShowCourseStatusEditModal] = useState(false);
  const [courseStatusEditValidated, setCourseStatusEditValidated] = useState(false);

  const handleCourseStatusEditSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
        setCourseStatusEditValidated(true);
      } else {
          setCourseStatusEditValidated(true);
          try{
              const responce = await changeCourseStatus(
                {
                  status: event.target.status.value
                }, course.id)
                setSavedCourse(responce);
                setCourseStatusEditValidated(false);
                toggleCourseStatusEditModal();

          }
          catch (error) {
            swal("Произошла ошибка!", error, "error");
          }
      }
  };
  
  function toggleCourseStatusEditModal () {
    setShowCourseStatusEditModal(!showCourseStatusEditModal);
  }

  async function SignUp() {
    try{
        await signUpForCourse(course.id)
        swal("Успешно!", "Вы подали заявку на курс!", "success");
    }
    catch (error) {
      swal("Произошла ошибка при подаче заявки!", error, "error");
    }
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
        <div>
        {
          (isAdmin || isTeacher) &&
            (<Button variant="warning" className="mb-2 ms-3" onClick={toggleCourseEditModal}>РЕДАКТИРОВАТЬ</Button>)
        }
        {
          (!isStudent && course.status == "OpenForAssigning") && 
          (<Button className="mb-2 ms-3" onClick={SignUp} >ЗАПИСАТЬСЯ НА КУРС</Button>)
        }
        </div>
      </span>
      <Card >
        <ListGroup variant="flush" className="w-100">
          <ListGroup.Item
              className="d-flex justify-content-between align-items-stretch"
          >
            <div className="ms-2 me-auto">
              <strong>Статус курса</strong>
              <div className={statusTextColor}>{statusMessage}</div>
            </div>
            <div  className="d-flex align-items-stretch">
             {(isAdmin || isTeacher) && 
             <Button variant="warning" className="flex-grow-1" onClick={toggleCourseStatusEditModal}>ИЗМЕНИТЬ</Button>}
            </div>
          </ListGroup.Item>
          <ListGroup.Item
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
        handleSubmit={handleCourseEditSubmit} validated={courseEditValidated} 
        isAdmin={isAdmin} course={course}
        />
        <CourseStatusEditModal show={showCourseStatusEditModal} onClose={toggleCourseStatusEditModal} 
        handleSubmit={handleCourseStatusEditSubmit} validated={courseStatusEditValidated} 
        isAdmin={isAdmin} course={course}
        />

    </div>
  );
}

export default CourseDetail;