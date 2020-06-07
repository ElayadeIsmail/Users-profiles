import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Header extends Component {
  state = {
    isAuthenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }
  onLogout = () => {
    const { firebase } = this.props;
    firebase.logout();
  };
  render() {
    const { isAuthenticated } = this.state;
    const { profile, auth } = this.props;
    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-danger'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            {" "}
            <i className='fas fa-users  text-dark'></i> Users
          </Link>
          <button
            className='navbar-toggler'
            data-toggle='collapse'
            data-target='#navbarNav'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            {isAuthenticated ? (
              <ul className='navbar-nav ml-auto'>
                {profile.imageUrl && profile.firstName ? (
                  <li className='nav-item'>
                    <Link className='nav-link' to={`/user/${auth.uid}`}>
                      <img
                        src={profile.imageUrl}
                        alt='Person'
                        style={{
                          width: "25px",
                          height: "25px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />{" "}
                      {profile.firstName}
                    </Link>
                  </li>
                ) : null}
                <li className='nav-item'>
                  <a onClick={this.onLogout} className='nav-link' href='#!'>
                    LogOut
                  </a>
                </li>
              </ul>
            ) : null}
            {!isAuthenticated ? (
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link to='/register' className='nav-link'>
                    Register
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>
                    LogIn
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}
Header.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export default compose(
  firebaseConnect(),
  connect((state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }))
)(Header);
