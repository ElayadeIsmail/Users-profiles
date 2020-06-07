import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import Alert from "../layout/Alert";
import PropTypes from "prop-types";
import { notifyUser } from "../actions/actionTypes";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    firebase.login({ email, password }).catch((err) => {
      notifyUser("Sorry Your Email Or password wrong", "error");
      setTimeout(() => {
        notifyUser(null, null);
      }, 3000);
    });
  };
  render() {
    const { email, password } = this.state;
    const { message, messageType } = this.props.notify;
    return (
      <div className='card w-50 mx-auto mt-5'>
        <div className='card-header text-center'>
          <i className='fas fa-lock'></i> LogIn
        </div>
        <div className='card-body'>
          {message ? (
            <Alert message={message} messageType={messageType} />
          ) : null}
          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                name='email'
                className='form-control'
                value={email}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                className='form-control'
                value={password}
                onChange={this.onChange}
              />
            </div>
            <input
              type='submit'
              value='LogIn'
              className='btn btn-danger btn-block'
            />
          </form>
        </div>
      </div>
    );
  }
}

LogIn.protoTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired,
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
    }),
    { notifyUser }
  )
)(LogIn);
