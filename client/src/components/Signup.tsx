import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  // State Hook
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent page refresh
    event.preventDefault();

    // // Make post request to API
    // const response = await axios({
    //   method: 'POST',
    //   url: '/api/signup',
    //   headers: { 'Content-Type': 'application/json' },
    //   data: JSON.stringify({}),
    // });
  };

  return (
    // Source: https://getbootstrap.com/docs/4.5/examples/floating-labels/
    <div className="container" id="login-page">
      <form className="form-signin" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <h2>Sign Up</h2>
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
            type="text"
            id="firstName"
            className="form-control"
            placeholder="First name"
            required
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
          <label htmlFor="firstName">First name</label>
        </div>
        <div className="form-label-group">
          <input
            type="text"
            id="lastName"
            className="form-control"
            placeholder="Last name"
            required
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
          />
          <label htmlFor="lastName">Last name</label>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
