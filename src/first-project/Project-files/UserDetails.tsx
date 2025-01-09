import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Userdetails.css';

const URL = "https://jsonplaceholder.typicode.com/users";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async (userId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/${userId}`);
      setUser(response.data);
    } catch {
      // Handle errors here if needed
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <button className="btn-back" onClick={() => navigate('/users')}>Back</button>
      <h1>User Details</h1>
      <table className="user-details-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
