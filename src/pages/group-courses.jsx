import { getGroupCourses, getRoles } from '../utils/api/requests';
import { useQuery } from '@tanstack/react-query';
import { Spinner, ListGroup, Card } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import GroupChangeBttn from '../components/group-page/GroupEditModal.jsx';
import CourseListElement from '../components/group-courses-page/CourseListIElement';


const GroupCourses = () => {
    const { id } = useParams();
    const {state} = useLocation()

    const [rolesData, setRoles] = useState(null);
    const [loading, setLoading] = useState(true);

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
    
    console.log(getGroupCoursesQuery.data)

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
                {rolesData.isAdmin && <GroupChangeBttn isCreate={true} className='m-5'/>}
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