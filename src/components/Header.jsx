import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useQuery } from '@tanstack/react-query';
import { Link} from 'react-router-dom';
import { getMyCourses, getProfile, getRoles } from '../utils/api/requests';
import { useEffect, useState } from 'react';


function Header() {
  const [rolesData, setRoles] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  
  console.log(localStorage.getItem("token"));

  useEffect(() => {
    async function getUserRoles(){
        const response = await getRoles();
        console.log(response.data);
        setRoles(response.data);
    }
    getUserRoles();
}, []);

useEffect(() => {
  async function getUserProfile(){
      const response = await getProfile();
      console.log(response.data);
      setProfileData(response.data);
  }
  getUserProfile();
}, []);

useEffect(() => {
  async function getUserCourses(){
      const response = await getMyCourses();
      console.log(response.data);
      setCoursesData(response.data);
  }
  getUserCourses();
}, []);

  const isAuth = profileData!= null;

  console.log (rolesData, coursesData, profileData);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          Кампусные курсы
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {isAuth ? (
              <>
                <Nav.Link as={Link} to="/groups" >Группы курсов</Nav.Link>
                {rolesData?.isStudent && coursesData.size > 0 ? (
                  <Nav.Link as={Link} to="/courses/my">Мои курсы</Nav.Link>
                ) : null
                }
                {rolesData?.isTeacher ? (
                  <Nav.Link as={Link} to="/courses/teaching" >Преподаваемые курсы </Nav.Link>
                ) : null
                }
              </>
            ) : null }
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link  href={isAuth ? '/profile' : '/registration'}>
                {isAuth ? profileData?.email : 'Регистрация'}
            </Nav.Link>   
            <Nav.Link  href='/login'>
                {isAuth ? 'Выход' : 'Вход'}
            </Nav.Link>   
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;