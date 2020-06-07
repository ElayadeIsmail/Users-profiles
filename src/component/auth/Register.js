import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { notifyUser } from "../actions/actionTypes";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    phone: "",
    imageUrl: "",
    password: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const {
      email,
      password,
      firstName,
      lastName,
      age,
      phone,
      imageUrl,
    } = this.state;
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      age.trim() === "" ||
      phone.trim() === "" ||
      imageUrl.trim() === ""
    ) {
      notifyUser("Please Fill in All The field", "error");
      setTimeout(() => {
        notifyUser(null, null);
      }, 3000);
      return;
    }
    firebase
      .createUser(
        { email, password },
        { email, firstName, lastName, age, phone, imageUrl }
      )
      .catch((err) => {
        notifyUser("Sorry Invalid Information Please Try Again ", "error");
        setTimeout(() => {
          notifyUser(null, null);
        }, 3000);
      });
  };
  render() {
    const {
      email,
      password,
      firstName,
      lastName,
      age,
      phone,
      imageUrl,
    } = this.state;
    const { message, messageType } = this.props.notify;
    return (
      <div className='card w-50 mx-auto mt-5'>
        <div className='card-header text-center'>
          <i className='fas fa-lock'></i> Register
        </div>
        <div className='card-body'>
          {message ? (
            <Alert message={message} messageType={messageType} />
          ) : null}
          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                className='form-control'
                name='firstName'
                value={firstName}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                className='form-control'
                name='lastName'
                value={lastName}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                className='form-control'
                name='email'
                value={email}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Phone</label>
              <input
                type='text'
                className='form-control'
                name='phone'
                value={phone}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='age'>Age</label>
              <input
                type='text'
                className='form-control'
                name='age'
                value={age}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='imageUrl'>Image Url</label>
              <input
                type='text'
                className='form-control'
                name='imageUrl'
                ivalue={imageUrl}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                className='form-control'
                name='password'
                value={password}
                onChange={this.onChange}
              />
            </div>
            <input
              type='submit'
              value='Submit'
              className='btn btn-danger btn-block'
            />
          </form>
        </div>
      </div>
    );
  }
}

Register.protoTypes = {
  firebase: PropTypes.object.isRequired,
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
    }),
    { notifyUser }
  )
)(Register);
