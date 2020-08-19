import React from 'react';

const Signup = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent page refresh
    event.preventDefault();

    // Make post request to API
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
