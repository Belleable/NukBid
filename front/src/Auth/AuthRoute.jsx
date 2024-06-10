import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert'; // Assuming Alert is a loading or error component

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await axios.get('http://localhost:3380/checkauth');
        if (res.data.success) {
          if (res.data.isAdmin) {
            navigate('/admin/home');
          } else {
            navigate('/user/home');
          }
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchAuth();
  }, [navigate]);

  return <Alert />; // Displaying a loading indicator while checking auth
};

export default AuthRoute;
