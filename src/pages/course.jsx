import {getRoles, getCourse } from '../utils/api/requests';
import { Spinner, ListGroup, Card, Button } from 'react-bootstrap';
import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import CourseDetail from '../components/course-page/CourseDetail';
import CourseDetailTab from '../components/course-page/CourseDetailTab';
import CourseParticipantsTab from '../components/course-page/CourseParticipantsTab';


const CoursePage = () => {
    const { id } = useParams();
    const [rolesData, setRoles] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        const [rolesResponse, courseResponse] = await Promise.all([getRoles(), getCourse(id)]);
        console.log(rolesResponse.data, courseResponse.data);
        setRoles(rolesResponse.data);
        setCourseData(courseResponse.data);
        setLoading(false);
    }
    fetchData();
    }, []);

  return (
    < div style={{ width: '80%', margin: '0 auto' }}>
      {
        loading ? (
          <div className="w-100 d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <h1 className='m-4 text-uppercase'>{courseData.name}</h1>
            <CourseDetail course={courseData} isAdmin={rolesData.isAdmin}/> 
            <CourseDetailTab course={courseData}/>
            <CourseParticipantsTab course={courseData} isAdmin={rolesData.isAdmin}/>
          </>
        )
      }
    </div>
  );
}

export default CoursePage