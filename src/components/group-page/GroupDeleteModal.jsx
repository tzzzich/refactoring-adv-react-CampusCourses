import Button from 'react-bootstrap/Button';
import ModalBase from '../ui/ModalBase';


const GroupDeleteModal = ({showGroupDeleteModal, toggleGroupDeleteModal, handleDelete}) => {

    return (
        <>

            <ModalBase 
                show={showGroupDeleteModal}
                onClose={toggleGroupDeleteModal}
                title={'Подтверждение'}
                bodyChildren={(
                    <>Вы действительно хотите удалить группу?</>
                )}
                footerChildren= {(
                    <>
                    <Button variant="secondary" onClick={toggleGroupDeleteModal}>
                        Отменить
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Удалить
                    </Button>
                    </>
                )}
            />
        </>
    );
}
  
export default GroupDeleteModal
