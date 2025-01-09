import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Posts.css';

const URL = "https://jsonplaceholder.typicode.com/posts";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate(); 
  const postsPerPage = 10;

  const fetchPosts = async (page: number) => {
    setLoading(true);
    setIsError({ status: false, msg: "" });
    try {
      const response = await axios.get(`${URL}`, {
        params: {
          _page: page,
          _limit: postsPerPage,
        },
      });
      const totalPosts = parseInt(response.headers['x-total-count']); 
      setTotalPages(Math.ceil(totalPosts / postsPerPage)); 
      const data = response.data;
      setPosts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setIsError({ status: true, msg: (error as Error).message || "Something went wrong, please try again!" });
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError.status) {
    return (
      <div className="container">
        <h1>{isError.msg}</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="btn-back" onClick={() => navigate('/home')}>Back</button>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <img src={`https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1+${post.id}`} alt={`Post ${post.id}`} />
            <h2>{post.id}. {post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
