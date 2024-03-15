import { Outlet } from 'react-router';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Root = () => {
  return (
    <div>
        <Header isAuth = {localStorage.getItem('token') != null}/>
        <Outlet />
    </div>
  );
}

