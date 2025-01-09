
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Form from './first-project/Project-files/Form';
import Home from './first-project/Project-files/Home';
import Logout from './first-project/Project-files/Logout';
import Posts from './first-project/Project-files/Posts';
import User from './first-project/Project-files/User';
import UserDetails from './first-project/Project-files/UserDetails';
import './first-project/styles/Form.css';
import './first-project/styles/Home.css';
import './first-project/styles/Logout.css';
import './first-project/styles/Posts.css';
import './first-project/styles/User.css';
import './first-project/styles/UserDetails.css';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/:id" element={<UserDetails />} />  
            <Route path="/posts" element={<Posts />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
