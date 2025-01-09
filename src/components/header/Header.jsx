import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import {
  getMyCourses,
  getProfile,
  getRoles,
  logout,
} from "../../utils/api/requests";
import { useEffect, useState } from "react";
import LogoutModal from "./LogoutModal";

function Header() {
  const [rolesData, setRoles] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    async function getUserRoles() {
      const response = await getRoles();
      setRoles(response.data);
      localStorage.setItem("roles", response.data);
    }
    getUserRoles();
  }, []);

  useEffect(() => {
    async function getUserProfile() {
      const response = await getProfile();
      console.log(response.data);
      setIsAuth(response.data != undefined && response.data != null);
      setProfileData(response.data);
      localStorage.setItem("email", response.data.email);
    }
    getUserProfile();
  }, []);

  // useEffect(() => {
  //   async function getUserCourses(){
  //       const response = await getMyCourses();
  //       setCoursesData(response.data);
  //   }
  //   getUserCourses();
  // }, []);

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  const handleLogout = async (event) => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Кампусные курсы</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {isAuth ? (
                <>
                  <Nav.Link as={Link} to="/groups">
                    Группы курсов
                  </Nav.Link>
                  {rolesData?.isStudent && (
                    <Nav.Link as={Link} to="/courses/my">
                      Мои курсы
                    </Nav.Link>
                  )}
                  {rolesData?.isTeacher ? (
                    <Nav.Link as={Link} to="/courses/teaching">
                      Преподаваемые курсы{" "}
                    </Nav.Link>
                  ) : null}
                </>
              ) : null}
            </Nav>

            <Nav className="ms-auto">
              <Nav.Link href={isAuth ? "/profile" : "/registration"}>
                {isAuth ? profileData?.email : "Регистрация"}
              </Nav.Link>
              {isAuth ? (
                <Nav.Link onClick={toggleLogoutModal}>Выход</Nav.Link>
              ) : (
                <Nav.Link href="/login">Вход</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LogoutModal
        show={showLogoutModal}
        onClose={toggleLogoutModal}
        handleLogout={handleLogout}
      />
    </>
  );
}

export default Header;
