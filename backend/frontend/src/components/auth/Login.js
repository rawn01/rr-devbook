import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const initState = {
    email: "",
    password: "",
  }
  const [formData, setFormData] = useState(initState);

  const { email, password } = formData;

  const onFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={(e) => onFormSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onFormDataChange(e)} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onFormDataChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  )
};

export default Login;
