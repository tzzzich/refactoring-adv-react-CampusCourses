import { useState } from "react";
import {
  Card,
  Tab,
  Container,
  Tabs,
  ListGroup,
  Badge,
  Button,
} from "react-bootstrap";
import { createCourseNotification } from "../../utils/api/requests";
import NotificationCreateModal from "./NotificationCreateModal";

function CourseDetailTab({
  course,
  isAdmin,
  isTeacher,
  isMainTeacher,
  isStudent,
  setSavedCourse,
}) {
  const [showCreateNotificationModal, setShowCreateNotificationModal] =
    useState(false);
  const [notificationCreateValidated, setNotificationCreateValidated] =
    useState(false);

  const toggleNotificationCreateModal = () => {
    setShowCreateNotificationModal(!showCreateNotificationModal);
  };

  const handleNotificationCreateSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setNotificationCreateValidated(true);
    } else {
      setNotificationCreateValidated(true);
      try {
        await createCourseNotification(course.id, {
          text: event.target.text.value,
          isImportant: event.target.isImportant.checked,
        });
        console.log(course.notifications);
        setSavedCourse((course) => {
          const newNotifications = [
            ...course.notifications,
            {
              text: event.target.text.value,
              isImportant: event.target.isImportant.checked,
            },
          ];
          return { ...course, notifications: newNotifications };
        });
        setNotificationCreateValidated(false);
        toggleNotificationCreateModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const notificationsTitle = (
    <span>
      Уведомления
      {course.notifications.length > 0 && (
        <Badge pill bg="danger" className="m-1">
          {course.notifications.length > 3 ? "3+" : course.notifications.length}
        </Badge>
      )}
    </span>
  );

  return (
    <div className="mt-5" border="light">
      <Tabs defaultActiveKey="requirements" id="course-detail-tab" justify>
        <Tab eventKey="requirements" title="Требования к курсу">
          <div className="border border-top-0 rounded-bottom-1">
            <div
              dangerouslySetInnerHTML={{ __html: course.requirements }}
              className="p-4 text-break"
            />
          </div>
        </Tab>
        <Tab eventKey="annotations" title="Аннотации">
          <div className="border border-top-0 rounded-bottom-1">
            <div
              dangerouslySetInnerHTML={{ __html: course.annotations }}
              className="p-4 text-break"
            />
          </div>
        </Tab>
        <Tab eventKey="notifications" title={notificationsTitle}>
          <div className="border border-top-0 rounded-bottom-1">
            <div className="p-4">
              {(isAdmin || isTeacher) && (
                <div>
                  <Button
                    className="mb-3"
                    onClick={toggleNotificationCreateModal}
                  >
                    СОЗДАТЬ УВЕДОМЛЕНИЕ
                  </Button>
                </div>
              )}
              {course.notifications.length > 0 ? (
                <ListGroup id="notifications">
                  {course.notifications.map((notification, index) => (
                    <ListGroup.Item
                      className="text-break"
                      key={index}
                      variant={notification.isImportant ? "danger" : ""}
                    >
                      {notification.text}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <strong className="text-muted">Уведомления отсутствуют.</strong>
              )}
            </div>
          </div>
        </Tab>
      </Tabs>
      <NotificationCreateModal
        show={showCreateNotificationModal}
        onClose={toggleNotificationCreateModal}
        handleSubmit={handleNotificationCreateSubmit}
        validated={notificationCreateValidated}
      />
    </div>
  );
}

export default CourseDetailTab;
