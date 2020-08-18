import React from 'react';
import './Login.css';

const Login = () => {
  return (
    // Source: https://getbootstrap.com/docs/4.5/examples/floating-labels/
    <div className="container" id="login-page">
      <form className="form-signin">
        <div className="text-center mb-4">
          <h2>Log in</h2>
        </div>
        <div className="form-label-group">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
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
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn-lg btn-primary btn-block">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
