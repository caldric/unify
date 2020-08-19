import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setUser, setLoggedIn }) => {
  // State Hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent page refresh
    event.preventDefault();

    // Make login request to API
    const response = await axios({
      method: 'put',
      url: '/api/login',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ email, password }),
    });

    // Store user in session storage and update states
    const {
      user,
      loggedIn,
    }: { user: string; loggedIn: boolean } = response.data;

    if (response.status === 200) {
      sessionStorage.setItem('user', user);
      setUser(user);
      setLoggedIn(loggedIn);
    }

    // Trigger redirect
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/" />;
  // Source: https://getbootstrap.com/docs/4.5/examples/floating-labels/
  return (
    <div className="container" id="login-page">
      <form className="form-signin" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <h2>Sign In</h2>
        </div>
        <div className="form-label-group">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-label-group">
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn-lg btn-primary btn-block">
          Sign In
        </button>
        <Link to="/signup">Don't have an account yet? Sign up here.</Link>
      </form>
    </div>
  );
};

export default Login;
