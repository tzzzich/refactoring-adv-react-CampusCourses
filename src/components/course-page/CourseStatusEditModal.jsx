import { Button} from 'react-bootstrap'
import ModalBase from '../ui/ModalBase';
import CourseStatusEditForm from './CourseStatusEditForm';

const CourseStatusEditModal = ({show, onClose, handleSubmit, validated, isAdmin, course}) => {
    return (
        <>
            <ModalBase 
                size='lg'
                title={'Изменение статуса курса'}
                show={show}
                onClose={onClose}
                bodyChildren ={
                    (course.status != "Finished") ? <CourseStatusEditForm handleSubmit={handleSubmit} validated={validated}
                    isAdmin = {isAdmin} course={course}/>
                    :
                    <strong>Статус курса не может быть изменён.</strong>
                    
                }
                footerChildren ={(
                    <>
                        <Button variant="secondary" onClick={onClose}>
                            Отменить
                        </Button>
                        {(course.status != "Finished") &&
                        <Button type="submit" form={'courseStatusEditForm'}>
                            Сохранить
                        </Button>
                        }   
                    </>
                )}
            />
            
        </>
    )
}

export default CourseStatusEditModal