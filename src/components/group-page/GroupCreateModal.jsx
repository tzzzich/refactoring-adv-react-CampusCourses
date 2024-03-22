import { Button} from 'react-bootstrap'
import ModalBase from '../ui/ModalBase';
import GroupNamingForm from './GroupNamingForm';

const GroupCreateModal = ({show, onClose, handleSubmit,
     defaultName, validated}) => {

    return (
        <>
            <ModalBase 
                title={'Создание группы'}
                show={show}
                onClose={onClose}
                bodyChildren ={(
                    <GroupNamingForm handleSubmit={handleSubmit} defaultName={defaultName} validated={validated}/>
                )}
                footerChildren ={(
                    <>
                        <Button variant="secondary" onClick={onClose}>
                            Отменить
                        </Button>
                        <Button type="submit" form={'groupNamingForm'}>
                            Сохранить
                        </Button>
                    </>
                )}
            />
            
        </>
    )
}

export default GroupCreateModal