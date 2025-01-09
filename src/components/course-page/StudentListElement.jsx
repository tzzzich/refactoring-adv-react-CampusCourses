import { useCallback, useEffect, useState } from "react";
import { Badge, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import {
  gradeStudent,
  setStudentRequestStatus,
} from "../../utils/api/requests";
import StudentGradeModal from "./StudentGradeModal";

function translate(mark) {
  switch (mark) {
    case "Passed": {
      return "успешно пройдена";
    }
    case "NotDefined": {
      return "отметки нет";
    }
    case "Failed": {
      return "зафейлена";
    }
    default: {
      return mark;
    }
  }
}

function getBgColor(mark) {
  switch (mark) {
    case "Passed": {
      return "success";
    }
    case "NotDefined": {
      return "secondary";
    }
    case "Failed": {
      return "danger";
    }
    default: {
      return "";
    }
  }
}

const StudentListElement = ({
  course,
  student,
  isAdmin,
  isStudent,
  isTeacher,
  isMainTeacher,
  setSavedCourse,
}) => {
  const [statusTextColor, setStatusTextColor] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [studentInteraction, setStudentInteraction] = useState(null);
  const [markType, setMarkType] = useState("");

  const [showStudentMidtermGradeModal, setShowStudentMidtermGradeModal] =
    useState(false);
  const [StudentMidtermGradeValidated, setStudentMidtermGradeValidated] =
    useState(false);
  const [showStudentFinalGradeModal, setShowStudentFinalGradeModal] =
    useState(false);
  const [StudentFinalGradeValidated, setStudentFinalGradeValidated] =
    useState(false);

  function toggleStudentMidtermGradeModal() {
    setShowStudentMidtermGradeModal(!showStudentMidtermGradeModal);
  }

  function toggleStudentFinalGradeModal() {
    setShowStudentFinalGradeModal(!showStudentFinalGradeModal);
  }

  const handleStudentGradeSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      if (markType == "Final") {
        setStudentFinalGradeValidated(true);
      } else {
        setStudentMidtermGradeValidated(true);
      }
    } else {
      if (markType == "Final") {
        setStudentFinalGradeValidated(true);
      } else {
        setStudentMidtermGradeValidated(true);
      }

      console.log(StudentFinalGradeValidated, StudentMidtermGradeValidated);
      try {
        await gradeStudent(
          {
            markType: markType,
            mark: event.target.mark.value,
          },
          course.id,
          student.id
        );
      } catch (error) {
        swal("Произошла ошибка!", error, "error");
      }
      const fieldName = markType == "Final" ? "finalResult" : "midtermResult";
      updateStudentField(student.id, fieldName, event.target.mark.value);
      setStudentFinalGradeValidated(false);
      setStudentMidtermGradeValidated(false);
      if (markType == "Final") {
        toggleStudentFinalGradeModal();
      } else {
        toggleStudentMidtermGradeModal();
      }
      //window.location.reload();
    }
  };

  const updateStudentField = (studentId, fieldName, newValue) => {
    setSavedCourse((course) => {
      const updatedStudents = course.students.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            [fieldName]: newValue,
          };
        }
        return student;
      });
      return {
        ...course,
        students: updatedStudents,
      };
    });
  };

  async function setStudentStatus(status) {
    try {
      await setStudentRequestStatus(
        {
          status: status,
        },
        course.id,
        student.id
      );
      updateStudentField(student.id, "status", status);
    } catch (error) {
      console.log(error);
    }
    //window.location.reload()
  }

  const setStatus = useCallback(() => {
    switch (student.status) {
      case "InQueue": {
        setStatusTextColor("text-primary");
        setStatusMessage("в очереди");
        setStudentInteraction(
          <div className="d-flex align-items-stretch gap-2">
            {course.studentsEnrolledCount < course.maximumStudentsCount && (
              <Button
                className="mr-2 "
                onClick={() => setStudentStatus("Accepted")}
              >
                принять
              </Button>
            )}
            <Button
              variant="danger"
              onClick={() => setStudentStatus("Declined")}
            >
              отклонить заявку
            </Button>
          </div>
        );
        break;
      }
      case "Accepted": {
        setStatusTextColor("text-success");
        setStatusMessage("принят в группу");
        setStudentInteraction(
          <>
            <div className="ms-2 me-auto">
              <div className="text-muted">
                {isAdmin || isTeacher ? (
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setMarkType("Midterm");
                      toggleStudentMidtermGradeModal();
                    }}
                  >
                    Промежуточная аттестация -{" "}
                  </a>
                ) : (
                  "Промежуточная аттестация -"
                )}
                <Badge className="m-1" bg={getBgColor(student.midtermResult)}>
                  {translate(student.midtermResult)}
                </Badge>
              </div>
            </div>
            <div className="ms-2 me-auto">
              <div className="text-muted">
                {isAdmin || isTeacher ? (
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setMarkType("Final");
                      toggleStudentFinalGradeModal();
                    }}
                  >
                    {" "}
                    Финальная аттестация -{" "}
                  </a>
                ) : (
                  "Финальная аттестация -"
                )}
                <Badge className="m-1" bg={getBgColor(student.finalResult)}>
                  {translate(student.finalResult)}
                </Badge>
              </div>
            </div>
          </>
        );
        break;
      }
      case "Declined": {
        setStatusTextColor("text-danger");
        setStatusMessage("отклонён");
        setStudentInteraction(null);
        break;
      }
      default: {
        setStatusTextColor("");
        setStatusMessage(student.status);
        setStudentInteraction(null);
        break;
      }
    }
  }, [student.status]);

  useEffect(() => {
    setStatus();
  }, [setStatus]);

  return (
    <>
      <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div>
            <strong className="text-break">{student.name}</strong>
            <div className="text-muted">
              Статус - <span className={statusTextColor}>{statusMessage}</span>
            </div>
          </div>
          <div className="text-muted">{student.email}</div>
        </div>

        <>
          {(isAdmin ||
            isTeacher ||
            (isStudent && student.email === localStorage.getItem("email"))) &&
            studentInteraction}
        </>
      </ListGroup.Item>
      <StudentGradeModal
        show={showStudentFinalGradeModal}
        onClose={toggleStudentFinalGradeModal}
        handleSubmit={handleStudentGradeSubmit}
        validated={StudentFinalGradeValidated}
        student={student}
        markType="Final"
      />
      <StudentGradeModal
        show={showStudentMidtermGradeModal}
        onClose={toggleStudentMidtermGradeModal}
        handleSubmit={handleStudentGradeSubmit}
        validated={StudentMidtermGradeValidated}
        student={student}
        markType="Midterm"
      />
    </>
  );
};

export default StudentListElement;
