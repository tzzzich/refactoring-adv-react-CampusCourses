/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spinner, ListGroup, Card } from "react-bootstrap";
// import { useLocation, useParams } from 'react-router-dom';
import CourseListElement from "../components/group-courses-page/CourseListIElement";
import { getCourses } from "../utils/api/requests/coursesRequests";
import CourcesList from "../components/course-page/CourcesList";

const UserCoursesPage = ({ title }) => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function getCources() {
      setLoading(true);
      getCourses(title).then((data) => {
        setCourses(data);
        setLoading(false);
      });
    }
    getCources();
  }, [title]);

  const refetchCourses = () => {
    function getCources() {
      setLoading(true);
      getCourses(title).then((data) => {
        setCourses(data);
        setLoading(false);
      });
    }
    getCources();
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1 className="m-5">
        {title == "my" ? "Мои курсы" : "Преподаваемые курсы"}
      </h1>
      {loading ? (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Card className="m-5">
          {courses && courses.length > 0 ? (
            <CourcesList data={courses} refetch={refetchCourses} />
          ) : (
            <h3 className="m-5">Курсов нет.</h3>
          )}
        </Card>
      )}
    </div>
  );
};

export default UserCoursesPage;
