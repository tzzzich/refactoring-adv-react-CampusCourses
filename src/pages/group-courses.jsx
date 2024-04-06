import { createCourse, getGroupCourses, getRoles } from '../utils/api/requests';
import { useQuery } from '@tanstack/react-query';
import { Spinner, ListGroup, Card, Button } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CourseListElement from '../components/group-courses-page/CourseListIElement';
import CourseCreateModal from '../components/group-courses-page/CourseCreateModal';


const GroupCourses = () => {
    const { id } = useParams();
    const {state} = useLocation()

    const [rolesData, setRoles] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCourseCreateModal, setShowCourseCreateModal] = useState(false);
    const [courseCreateValidated, setCourseCreateValidated] = useState(false);

    useEffect(() => {
        async function getUserRoles(){
            const response = await getRoles();
            setRoles(response.data);
            setLoading(false);
        }
        getUserRoles();
    }, []);
  
    const getGroupCoursesQuery = useQuery({
        queryKey: ['courses'],
        queryFn: () => getGroupCourses(id), 
        select: ({ data }) => {
            return data.map((course) => (
                <CourseListElement course={course} id ={course.id} key={course.id}/>
            ));
        }
    });

    const toggleCourseCreateModal = () => {
        setShowCourseCreateModal(!showCourseCreateModal);
    }

    const handleCourseCreateSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
          setCourseCreateValidated(true);
        } else {
            setCourseCreateValidated(true);
            try{
                await createCourse( {
                    name: event.target.name.value,
                    startYear: event.target.startYear.value,
                    maximumStudentsCount: event.target.maximumStudentsCount,
                    semester: event.target.semester.value,
                    requirements: event.target.requirements.value,
                    annotations: event.target.annotations.value,
                    mainTeacherId: event.target.mainTeacherId.value
                })
                window.location.reload();
            }
            catch (error) {
                //console.log(error);
            }
        }
    };
    

    return (
        < div style={{ width: '80%', margin: '0 auto' }}>
            <h1 className='m-5'>Группа - {state.groupTitle}</h1>
            {
                getGroupCoursesQuery.isLoading || loading ? (
                <div className="w-100 d-flex justify-content-center align-items-center">
                    <Spinner animation="border" />
                </div>
                ) : (
                <>
                {rolesData.isAdmin && 
                (<>
                    <Button className="m-1" onClick={toggleCourseCreateModal}>
                        Создать
                    </Button>
                    <CourseCreateModal
                        show={showCourseCreateModal}
                        onClose={toggleCourseCreateModal}
                        handleSubmit={handleCourseCreateSubmit}
                        validated={courseCreateValidated}
                    />
                </>)}
                    <Card className='mt-3'>
                        {getGroupCoursesQuery.data.length > 0 && (
                            <ListGroup variant="flush" className="w-100">
                                {getGroupCoursesQuery.data}
                            </ListGroup>
                        )}
                        { getGroupCoursesQuery.data.length == 0 && (<h3 className='m-5'>К сожалению, курсов в этой группе ещё нет.</h3>)}
                    </Card>
                </>
                )
            }
        </div>
    );
}

export default GroupCourses