import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => { 
    const email = localStorage.getItem("email"); 
    const password = localStorage.getItem("password");
    
    if (!email || !password) { 
      navigate('/'); } 
   },[navigate]);

  const handleUsersClick = () => navigate('/user');
  const handlePostsClick = () => navigate('/posts');
  const handleLogoutClick = () => navigate('/logout');

  return (
    <div className='container'>
      <button className='btn-logout' onClick={handleLogoutClick}>Logout</button>
      <h1 className='heading'><u>Welcome to the Home Page!</u></h1>
      <div className='box'>
      <button className='btn-users' onClick={handleUsersClick}>Users</button>
      <button className='btn-posts' onClick={handlePostsClick}>Posts</button>
      </div>
    
    </div>
  );
};

export default Home;
