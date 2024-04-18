/* eslint-disable react/prop-types */
import { ListGroup } from 'react-bootstrap';
import CourseListElement from '../group-courses-page/CourseListIElement';

const CourcesList = ({data, refetch}) => {
  return (
    <ListGroup variant="flush" className="w-100">
        {data.map((course) => (
            <CourseListElement course={course} refetch={refetch} key={course.id}/>
        ))}
    </ListGroup>
  )
}

export default CourcesList