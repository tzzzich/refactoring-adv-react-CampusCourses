import Button from "react-bootstrap/Button";
import ModalBase from "../ui/ModalBase";

const LogoutModal = ({ handleClose, show, handleLogout }) => {
  return (
    <>
      <ModalBase
        show={show}
        onClose={handleClose}
        title={"Подтверждение"}
        bodyChildren={"Вы действительно хотите выйти?"}
        footerChildren={
          <>
            <Button variant="secondary" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Выйти
            </Button>
          </>
        }
      />
    </>
  );
};

export default LogoutModal;
