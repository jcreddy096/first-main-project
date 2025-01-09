import React, { useState } from 'react';
import "../styles/Form.css";
import { useNavigate } from 'react-router-dom';

const Form: React.FC = () => {
  const [email, setEmail] = useState("");    
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
      setEmail("");
      setPassword("");
      navigate('/home');
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className='form-container'>
      <h1 className='login'>Login Page</h1>
      <form className='form' onSubmit={handleSubmit}>
        {error && <div className='error-message'>{error}</div>}
        <div className='form-group'>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type="password"
            placeholder="Password"
            minLength={8}
            maxLength={18}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className='btn-submit' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
