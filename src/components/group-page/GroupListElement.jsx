/* eslint-disable react/prop-types */
import { useState } from "react";
import { editGroup, deleteGroup } from "../../utils/api/requests";
import { ListGroup, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import GroupDeleteModal from "./GroupDeleteModal";
import GroupEditModal from "./GroupEditModal";
import swal from "sweetalert";

const GroupListElement = ({ isAdmin, group, refetch }) => {
  // console.log(group);

  const [showGroupDeleteModal, setShowGroupDeleteModal] = useState(false);
  const [showGroupEditModal, setShowGroupEditModal] = useState(false);
  const [groupEditValidated, setgroupEditValidated] = useState(false);

  const toggleGroupDeleteModal = () => {
    setShowGroupDeleteModal(!showGroupDeleteModal);
  };

  const toggleGroupEditModal = () => {
    setShowGroupEditModal(!showGroupEditModal);
  };

  const handleDelete = async (event) => {
    try {
      await deleteGroup(group.id);
      toggleGroupDeleteModal();
      swal("Успешно!", "Группа удалена", "success");
      refetch();
    } catch (error) {
      swal("Произошла ошибка при удалении группы!", error, "error");
    }
  };

  const handleEditGroupSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setgroupEditValidated(true);
    } else {
      setgroupEditValidated(true);
      try {
        await editGroup(
          {
            name: event.target.name.value,
          },
          group.id
        );
        setgroupEditValidated(false);
        toggleGroupEditModal();
        swal("Успешно!", "Группа отредактирована!", "success");
        refetch();
      } catch (error) {
        swal("Произошла ошибка при редактировании группы!", error, "error");
      }
    }
  };

  return (
    <>
      <ListGroup.Item className="d-flex justify-content-between align-items-center">
        <Col>
          <Link
            to={`/groups/${group.id}`}
            state={{ groupTitle: group.name }}
            className="text-break"
            style={{ textDecoration: "none", textColor: "inherit" }}
          >
            {group.name}
          </Link>
        </Col>
        {isAdmin ? (
          <>
            <>
              <Button
                variant="warning"
                className="m-1"
                onClick={toggleGroupEditModal}
              >
                РЕДАКТИРОВАТЬ
              </Button>

              <Button
                variant="danger"
                className="m-1"
                onClick={toggleGroupDeleteModal}
              >
                УДАЛИТЬ
              </Button>
            </>
            <GroupDeleteModal
              toggleGroupDeleteModal={toggleGroupDeleteModal}
              showGroupDeleteModal={showGroupDeleteModal}
              handleDelete={handleDelete}
            />
            <GroupEditModal
              show={showGroupEditModal}
              onClose={toggleGroupEditModal}
              handleSubmit={handleEditGroupSubmit}
              defaultName={group.name}
              validated={groupEditValidated}
            />
          </>
        ) : (
          <></>
        )}
      </ListGroup.Item>
    </>
  );
};

export default GroupListElement;
