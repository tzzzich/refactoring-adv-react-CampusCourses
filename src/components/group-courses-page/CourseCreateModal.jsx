import { Button } from "react-bootstrap";
import ModalBase from "../ui/ModalBase";
import CourseFullInfoForm from "./CourseFullInfoForm";

const CourseCreateModal = ({ show, onClose, handleSubmit, validated }) => {
  return (
    <>
      <ModalBase
        size="lg"
        title={"Создание курса"}
        show={show}
        onClose={onClose}
        bodyChildren={
          <CourseFullInfoForm
            handleSubmit={handleSubmit}
            validated={validated}
          />
        }
        footerChildren={
          <>
            <Button variant="secondary" onClick={onClose}>
              Отменить
            </Button>
            <Button type="submit" form={"courseFullInfoForm"}>
              Сохранить
            </Button>
          </>
        }
      />
    </>
  );
};

export default CourseCreateModal;
