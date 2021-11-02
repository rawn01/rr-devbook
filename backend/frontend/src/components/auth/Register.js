import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alertAction';
import { connect } from 'react-redux';
import { register } from '../../actions/authAction';

const Register = (props) => {
  const initState = {
    name: "",
    email: "",
    password: "",
    password2: "",
  }
  const [formData, setFormData] = useState(initState);

  const { name, email, password, password2 } = formData;

  const onFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Test");
      props.setAlert("Passwords do not match", "danger")
    } else {
      console.log(formData);
      props.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
    }
  };

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={(e) => onFormSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => onFormDataChange(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onFormDataChange(e)} />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onFormDataChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onFormDataChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

{/* const mapStateToProps = () => {
  return {

  };
}

const mapDispatchToProps = (state) => {
  return {
    setAlert,
    register
  };
} */}

export default connect(null, { setAlert, register })(Register);
