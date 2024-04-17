import { useCallback, useEffect, useState } from 'react';
import { Badge, Button, ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function translate(mark) {
    switch(mark) {
        case "Passed" :{
            return "успешно пройдена"
        }
        case "NotDefined":{
            return "отметки нет"
        }
        case "Failed": {
            return "зафейлена"
        }
        default: {
            return mark
        }
    }
}

function getBgColor(mark) {
    switch(mark) {
        case "Passed" :{
            return 'success'
        }
        case "NotDefined":{
            return 'secondary'
        }
        case "Failed": {
            return 'danger'
        }
        default: {
            return ''
        }
    }
}

const StudentListElement = ({student, isAdmin}) => {

    const [statusTextColor, setStatusTextColor] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [studentInteraction, setStudentInteraction] = useState(null);


    const setStatus = useCallback(() => {
        switch (student.status) {
            case "InQueue":{
                setStatusTextColor('text-primary')
                setStatusMessage('в очереди')
                setStudentInteraction((
                    <div className="d-flex align-items-center gap-2">
                        <Button  className='mr-2'>принять</Button>
                        <Button variant='danger'>отклонить заявку</Button>
                    </div>
                ))
                break;
            }
            case "Accepted": {
                setStatusTextColor('text-success')
                setStatusMessage('принят в группу')
                setStudentInteraction((
                    <>
                        <div className="ms-2 me-auto">
                                <div className="text-muted">Промежуточная аттестация - 
                                    <Badge className="m-1" bg={getBgColor(student.midtermResult)}>{translate(student.midtermResult)}</Badge>
                                </div>
                        </div> 
                        <div className="ms-2 me-auto">
                                <div className="text-muted">Финальная аттестация - 
                                    <Badge className="m-1" bg={getBgColor(student.finalResult)}>{translate(student.finalResult)}</Badge>
                                </div>

                        </div> 
                    </>
                ))
                break;
            }
            case "Declined":{
                setStatusTextColor('text-danger')
                setStatusMessage('отклонён')
                break;
            }
            default:{
                setStatusTextColor('')
                setStatusMessage(student.status)
                break;
            }
        }
    }, [student.status]);

    useEffect(() => {
        setStatus();
    }, [setStatus]);
      
    return (
        <>
            <ListGroup.Item
                className="d-flex justify-content-between align-items-start"
            >
                
                <div className="ms-2 me-auto">
                    <div>
                        <strong className="text-break">
                            {student.name} 
                        </strong>
                        <div className="text-muted">Статус - <span className={statusTextColor}>{statusMessage}</span></div>
                    </div>
                    <div className="text-muted">{student.email}</div>
                </div> 

                <>
                    {
                        isAdmin && studentInteraction
                    }
                </>

            </ListGroup.Item>
        </>
    )
  }
  
  export default StudentListElement