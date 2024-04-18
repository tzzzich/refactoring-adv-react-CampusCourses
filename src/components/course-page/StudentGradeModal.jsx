import { Button} from 'react-bootstrap'
import ModalBase from '../ui/ModalBase';
import StudentGradeForm from './StudentGradeForm';

const StudentGradeModal = ({show, onClose, handleSubmit, validated, student, markType}) => {  



    return (
        <>
            <ModalBase 
                size='lg'
                title={<strong>Изменение отметки для "{markType == "Final" ? "Финальная" : "Промежуточная"} аттестация"</strong>}
                show={show}
                onClose={onClose}
                bodyChildren ={(
                    <StudentGradeForm onSubmit={handleSubmit} validated={validated} student={student}/>
                )}
                footerChildren ={(
                    <>
                        <Button variant="secondary" onClick={onClose}>
                            Отменить
                        </Button>
                        <Button type="submit" form={'studentGradeForm'}>
                            Сохранить
                        </Button>
                    </>
                )}
            />
            
        </>
    )
}

export default StudentGradeModal