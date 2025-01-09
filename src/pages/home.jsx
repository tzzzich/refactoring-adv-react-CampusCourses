import { getProfile } from "../utils/api/requests";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";

const Home = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    async function getAuthorized() {
      const response = await getProfile();
      try {
        setIsAuth(response.data != undefined && response.data != null);
      } catch {}
      isLoading(false);
      console.log(loading);
    }
    getAuthorized();
  }, []);

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      {loading ? (
        <Spinner animation="border" />
      ) : isAuth ? (
        <img
          src="/src/assets/kotik_authorized.jpg"
          className="img-fluid w-100 h-100"
          alt="Welcome!"
        />
      ) : (
        <img
          src="/src/assets/kotik_unauthorized.jpg"
          className="img-fluid w-100 h-100"
          alt="Welcome!"
        />
      )}
    </div>
  );
};

export default Home;
