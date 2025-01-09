import { Button } from "react-bootstrap";
import ModalBase from "../ui/ModalBase";
import CourseEditForm from "./CourseEditForm";

const CourseEditModal = ({
  show,
  onClose,
  handleSubmit,
  validated,
  isAdmin,
  course,
}) => {
  return (
    <>
      <ModalBase
        size="lg"
        title={"Редактирование курса"}
        show={show}
        onClose={onClose}
        bodyChildren={
          <CourseEditForm
            handleSubmit={handleSubmit}
            validated={validated}
            isAdmin={isAdmin}
            course={course}
          />
        }
        footerChildren={
          <>
            <Button variant="secondary" onClick={onClose}>
              Отменить
            </Button>
            <Button type="submit" form={"courseEditForm"}>
              Сохранить
            </Button>
          </>
        }
      />
    </>
  );
};

export default CourseEditModal;
