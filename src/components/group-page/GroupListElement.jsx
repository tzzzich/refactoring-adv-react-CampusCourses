import { ListGroup, Button, Modal, Form, InputGroup, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GroupChangeBttn from './GroupChangeBttn';
import GroupDeleteBttn from './GroupDeleteBttn';

const GroupListElement = ({isAdmin, group}) => {
      
    return (
        <>
                <ListGroup.Item
                    action 
                    className="d-flex justify-content-between align-items-center"
                >
                    <Link to={`/groups/${group.id}`} state={{groupTitle:group.name}} style={{ textDecoration: 'none', textColor:'inherit' }}>
                        {group.name}
                    </Link>
                    {
                        isAdmin ? (
                        <>  
                            <div>
                                <GroupChangeBttn id ={group.id} defaultName={group.name}/>
                                <GroupDeleteBttn id ={group.id}/>
                            </div>
                        </>
                        ) : (
                            <></>
                        )
                    }
                </ListGroup.Item>
        </>
    )
  }
  
  export default GroupListElement