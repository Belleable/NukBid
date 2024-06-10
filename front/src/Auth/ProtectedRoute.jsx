import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import Alert from '../components/Alert';
import axios from 'axios';

const ProtectedRoute = ({ isAdmin }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await axios.get('http://localhost:3380/checkauth');
        if (res.data.success) {
          if (res.data.isAdmin === isAdmin) {
            setLoading(false);
          } else {
            toast.error(res.data.text || 'Access denied');
            navigate('/login');
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
  }, [navigate, isAdmin]);

  if (loading) {
    return <Alert />; // Displaying a loading indicator while checking auth
  }

  return <Outlet />;
};

export default ProtectedRoute;
