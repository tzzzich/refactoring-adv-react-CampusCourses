import { getGroups, getRoles, createGroup } from '../utils/api/requests';
import { useQuery } from '@tanstack/react-query';
import { Spinner, ListGroup, Card, Button } from 'react-bootstrap';
import GroupListElement from '../components/group-page/GroupListElement';
import { useState, useEffect } from 'react';
import GroupCreateModal from '../components/group-page/GroupCreateModal';


const GroupsPage = () => {

  const [rolesData, setRoles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGroupCreateModal, setShowGroupCreateModal] = useState(false);
  const [groupCreateValidated, setgroupCreateValidated] = useState(false);

  useEffect(() => {
      async function getUserRoles(){
          const response = await getRoles();
          setRoles(response.data);
          setLoading(false);
      }
      getUserRoles();
  }, []);
  
  const getGroupsQuery = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
    select: ({ data }) => {
      return data.map((group) => (
        <GroupListElement group = {group} key={group.id} isAdmin = {rolesData.isAdmin}/>
      ));
    }
  });

  const handleCreateGroupSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setgroupCreateValidated(true);
    } else {
        setgroupCreateValidated(true);
        try{
            await createGroup( {
                name: event.target.name.value
            })
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }
};

  const toggleGroupCreateModal = () => {
    setShowGroupCreateModal(!showGroupCreateModal);
  }

  return (
    < div style={{ width: '80%', margin: '0 auto' }}>
      <h1 className='m-5'>Группы кампусных курсов</h1>
      {
        getGroupsQuery.isLoading || loading ? (
          <div className="w-100 d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
          {rolesData.isAdmin && (
            <>
              <Button className="m-1" onClick={toggleGroupCreateModal}>
                  Создать
              </Button>

              <GroupCreateModal 
                show={showGroupCreateModal}
                onClose={toggleGroupCreateModal}
                handleSubmit={ handleCreateGroupSubmit}
                validated = {groupCreateValidated}
              />
            </>

          )}
            <Card className='mt-3 mb-3'>
              <ListGroup variant="flush" className="w-100">
                {getGroupsQuery.data}
              </ListGroup>
            </Card>
          </>
        )
      }
    </div>
  );
}

export default GroupsPage