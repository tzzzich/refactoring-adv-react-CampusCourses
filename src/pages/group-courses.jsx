import { createCourse, getGroupCourses, getRoles } from '../utils/api/requests';
import { useQuery } from '@tanstack/react-query';
import { Spinner, ListGroup, Card, Button } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CourseListElement from '../components/group-courses-page/CourseListIElement';
import CourseCreateModal from '../components/group-courses-page/CourseCreateModal';
import swal from 'sweetalert';


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
            // console.log('data:', data);
            return data.map((course) => (
                <CourseListElement course={course} refetch={refetchCourses} id ={course.id} key={course.id}/>
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
                    maximumStudentsCount: event.target.maximumStudentsCount.value,
                    semester: event.target.semester.value,
                    requirements: event.target.requirements.value,
                    annotations: event.target.annotations.value,
                    mainTeacherId: event.target.mainTeacherId.value
                }, id)
                setCourseCreateValidated(false);
                toggleCourseCreateModal();
                getGroupCoursesQuery.refetch();
                swal("Успешно!", "Курс создан", "success");
            }
            catch (error) {
                swal("Произошла ошибка при создании курса!", error, "error");
            }
        }
    };

    const refetchCourses = () => {
        getGroupCoursesQuery.refetch();
    }
    

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
                    <Card className='m-5'>
                    {getGroupCoursesQuery.data && getGroupCoursesQuery.data.length > 0 ? (
                        <ListGroup variant="flush" className="w-100">
                            {getGroupCoursesQuery.data}
                        </ListGroup>
                    ) : (
                        <h3 className='m-5'>К сожалению, курсов в этой группе ещё нет.</h3>
                    )}
                    </Card>
                </>
                )
            }
        </div>
    );
}

export default GroupCourses