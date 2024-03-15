import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const GroupsPage = () => {

    const rolesData = {isStudent: true, isTeacher:true, isAdmin:true};
  return (
    < div style={{ width: '80%', margin: '0 auto' }}>
      <h1 style={{ marginLeft: '20px' }}>Афиша</h1>
      <div className="d-flex flex-row flex-wrap justify-content-space-evenly gap-4 mb-5">
        <Card style={{ width: '18rem' }}>
          <ListGroup variant="flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </div>
  );
}

export default GroupsPage