import React from 'react';

const Login = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent page refresh
    event.preventDefault();

    console.log('Login request received');
  };

  return (
    // Source: https://getbootstrap.com/docs/4.5/examples/floating-labels/
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
