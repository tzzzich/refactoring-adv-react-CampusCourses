import { useState } from 'react';
import { editGroup, deleteGroup } from '../../utils/api/requests';
import { ListGroup, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GroupDeleteModal from './GroupDeleteModal';
import GroupEditModal from './GroupEditModal';

const GroupListElement = ({isAdmin, group}) => {

    const [showGroupDeleteModal, setShowGroupDeleteModal] = useState(false);
    const [showGroupEditModal, setShowGroupEditModal] = useState(false);
    const [groupEditValidated, setgroupEditValidated] = useState(false);

    const toggleGroupDeleteModal = () => {
        setShowGroupDeleteModal(!showGroupDeleteModal);
    }

    const toggleGroupEditModal = () => {
        setShowGroupEditModal(!showGroupEditModal);
    }

    const handleDelete = async (event) => {
        try{
            await deleteGroup(group.id);
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleEditGroupSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
          setgroupEditValidated(true);
        } else {
            setgroupEditValidated(true);
            try{
                await editGroup( {
                    name: event.target.name.value
                }, group.id )
                window.location.reload();
            }
            catch (error) {
                console.log(error);
            }
        }
    };

      
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
                                <Button variant='warning' className="m-1" onClick={toggleGroupEditModal}>
                                    РЕДАКТИРОВАТЬ
                                </Button>

                                <Button variant="danger" className="m-1" onClick={toggleGroupDeleteModal}>
                                    УДАЛИТЬ
                                </Button>
                            </div>
                            <GroupDeleteModal 
                                toggleGroupDeleteModal={toggleGroupDeleteModal}
                                showGroupDeleteModal={showGroupDeleteModal}
                                handleDelete={handleDelete}
                            />
                            <GroupEditModal
                                show={showGroupEditModal}
                                onClose={toggleGroupEditModal}
                                handleSubmit={ handleEditGroupSubmit}
                                defaultName={group.name}
                                validated = {groupEditValidated}
                            />
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