
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/User.css';

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

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate(); 
  const usersPerPage = 2;

  const fetchUsers = async (page: number) => {
    setLoading(true);
    setError(null); 
    try {
      const response = await axios.get(URL, {
        params: { _page: page, _limit: usersPerPage },
      });
      const totalUsers = parseInt(response.headers['x-total-count']);
      setTotalPages(Math.ceil(totalUsers / usersPerPage));
      setUsers(response.data);
    } catch {
      setError('Failed to fetch users. Please try again later.'); 
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="container">
      <button className="btn-back" onClick={() => navigate('/home')}>Back</button>
      <h1>Users</h1>
      {loading && <h2><p>Loading...</p></h2>}
      {!loading && error && <h2><p>{error}</p></h2>}
      {!loading && !error && (
        <>
          <table className="users-table">
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
              {users.map(user => (
                <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
