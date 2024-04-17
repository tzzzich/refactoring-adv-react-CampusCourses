import { Badge, ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TeacherListElement = ({teacher}) => {
      
    return (
        <>
            <ListGroup.Item
                className="d-flex justify-content-between align-items-start"
            >
                
                <div className="ms-2 me-auto">
                    <div>
                        <strong className="text-break">
                            {teacher.name} 
                        </strong>
                        <Badge 
                            className='m-1'
                            bg='success'
                        >
                            {teacher.isMain ?
                            'Основной'
                            :
                            null}
                        </Badge>
                    </div>
                    <div className="text-muted">{teacher.email}</div>
                </div> 

            </ListGroup.Item>
        </>
    )
  }
  
  export default TeacherListElement