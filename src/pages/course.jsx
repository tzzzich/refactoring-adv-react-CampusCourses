import { getRoles, getCourse } from "../utils/api/requests";
import { Spinner, ListGroup, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseDetail from "../components/course-page/CourseDetail";
import CourseDetailTab from "../components/course-page/CourseDetailTab";
import CourseParticipantsTab from "../components/course-page/CourseParticipantsTab";

const CoursePage = () => {
  const { id } = useParams();
  const [rolesData, setRoles] = useState(localStorage.getItem("roles"));
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isMainTeacher, setIsMainTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [savedCourse, setSavedCourse] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [rolesResponse, courseResponse] = await Promise.all([
        getRoles(),
        getCourse(id),
      ]);
      console.log(rolesResponse.data, courseResponse.data);
      setRoles(rolesResponse.data);
      setIsTeacher(
        courseResponse.data.teachers.find(
          (teacher) => teacher.email === localStorage.getItem("email")
        )
      );
      setIsMainTeacher(
        courseResponse.data.teachers.find(
          (teacher) =>
            teacher.email === localStorage.getItem("email") &&
            teacher.isMain === true
        )
      );
      setIsStudent(
        courseResponse.data.students.find(
          (student) => student.email === localStorage.getItem("email")
        )
      );
      setSavedCourse(courseResponse.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      {loading || savedCourse == undefined ? (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <h1 className="m-4 text-uppercase">{savedCourse.name}</h1>
          <CourseDetail
            course={savedCourse}
            isAdmin={rolesData.isAdmin}
            isTeacher={isTeacher}
            isMainTeacher={isMainTeacher}
            isStudent={isStudent}
            setSavedCourse={setSavedCourse}
          />
          <CourseDetailTab
            course={savedCourse}
            isAdmin={rolesData.isAdmin}
            isTeacher={isTeacher}
            isMainTeacher={isMainTeacher}
            isStudent={isStudent}
            setSavedCourse={setSavedCourse}
          />
          <CourseParticipantsTab
            course={savedCourse}
            isAdmin={rolesData.isAdmin}
            isTeacher={isTeacher}
            isMainTeacher={isMainTeacher}
            isStudent={isStudent}
            setSavedCourse={setSavedCourse}
          />
        </>
      )}
    </div>
  );
};

export default CoursePage;
