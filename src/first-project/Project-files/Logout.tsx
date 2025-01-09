import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Logout.css';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");

    
    setTimeout(() => {
      navigate('/');
    }, 2000); 
  }, [navigate]);

  return (
    <div className='logout-container'>
      <h1>You have been logged out.</h1>
      <p>Redirecting to the login page...</p>
    </div>
  );
};

export default Logout;
