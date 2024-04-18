/* eslint-disable react/prop-types */
import { ListGroup } from 'react-bootstrap';
import GroupListElement from './GroupListElement';

const GroupsList = ({data, refetch, rolesData}) => {

  return (
    <ListGroup variant="flush" className="w-100">
        {data.map((group) => (
            <GroupListElement group = {group} key={group.id} refetch={refetch} isAdmin={rolesData.isAdmin}/>
        ))}
    </ListGroup>
  )
}

export default GroupsList