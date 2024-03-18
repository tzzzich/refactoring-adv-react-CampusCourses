import { ListGroup, Button, Modal, Form, InputGroup, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GroupChangeBttn from './ui/GroupChangeBttn';
import GroupDeleteBttn from './ui/GroupDeleteBttn';

const GroupListElement = ({isAdmin, group}) => {
      
    return (
        <>
                <ListGroup.Item
                    action 
                    className="d-flex justify-content-between align-items-center"
                >
                    <Link to={`/groups/${group.id}`} style={{ textDecoration: 'none', textColor:'inherit' }}>
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