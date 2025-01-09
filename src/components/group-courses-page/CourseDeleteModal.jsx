import Button from "react-bootstrap/Button";
import ModalBase from "../ui/ModalBase";

const CourseDeleteModal = ({
  showCourseDeleteModal,
  toggleCourseDeleteModal,
  handleDelete,
}) => {
  return (
    <>
      <ModalBase
        show={showCourseDeleteModal}
        onClose={toggleCourseDeleteModal}
        title={"Подтверждение"}
        bodyChildren={<>Вы действительно хотите удалить курс?</>}
        footerChildren={
          <>
            <Button variant="secondary" onClick={toggleCourseDeleteModal}>
              Отменить
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Удалить
            </Button>
          </>
        }
      />
    </>
  );
};

export default CourseDeleteModal;
