import { getGroups, getRoles } from '../utils/api/requests';
import { useQuery } from '@tanstack/react-query';
import { Spinner, ListGroup, Card } from 'react-bootstrap';
import GroupListElement from '../components/GroupListElement';
import { useState, useEffect } from 'react';
import GroupChangeBttn from '../components/ui/GroupChangeBttn';


const GroupsPage = () => {

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

  console.log(rolesData);
  
  const getGroupsQuery = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
    select: ({ data }) => {
      return data.map((group) => (
        <GroupListElement group = {group} key={group.id} isAdmin = {rolesData.isAdmin}/>
      ));
    }
  });



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
          {rolesData.isAdmin && <GroupChangeBttn isCreate={true} className='m-5'/>}
            <Card className='mt-3'>
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