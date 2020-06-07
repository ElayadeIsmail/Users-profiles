import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import "./user/user.css";

class UserDetails extends Component {
  onDelete = (e) => {
    const { firestore, user, firebase, history } = this.props;
    const userAcc = firebase.auth().currentUser;
    firestore
      .delete({ collection: "users", doc: user.id })
      .then(() => history.push("/"));
    userAcc
      .delete()
      .then(() => history.push("/register"))
      .catch((err) => userAcc.delete());
  };
  render() {
    const { user, auth } = this.props;

    if (user) {
      return (
        <div>
          <div className='row'>
            <div className='col-md-8'>
              <Link to='/' className='btn btn-link text-danger'>
                <i className='fas fa-arrow-circle-left'></i> Profiles
              </Link>
            </div>
            {auth.uid === user.id ? (
              <div className='col-md-4'>
                <div className='btn-group float-right'>
                  <Link to={`/user/edit/${user.id}`} className='btn btn-dark'>
                    {" "}
                    <i className='fas fa-pencil-alt'></i> Edit
                  </Link>
                  <button className='btn btn-danger' onClick={this.onDelete}>
                    {" "}
                    <i className='fas fa-times'></i> Delete Account
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <div className='card mx-auto w-50'>
            <div className='card-header bg-danger text-light text-center'>
              User Information
            </div>
            <div className='card-body bg-dark text-light'>
              <img
                src={user.imageUrl}
                alt='user'
                className='card-img card-info mx-auto d-block'
                style={{
                  height: "400px",
                  objectFit: "cover",
                  width: "400px",
                  objectPosition: "center top",
                }}
              />

              <div className='card-body'>
                <div className='bg-danger p-2 d-flex justify-content-center border-bottom'>
                  <span className='mr-1'>
                    Name: {user.firstName} {user.lastName}
                  </span>
                </div>
                <div className='bg-danger p-2 d-flex justify-content-center border-bottom'>
                  <span className='mr-1'>Email: {user.email}</span>
                </div>
                <div className='bg-danger p-2 d-flex justify-content-center border-bottom'>
                  <span className='mr-1'>Phone: {user.phone}</span>
                </div>
                <div className='bg-danger p-2 d-flex justify-content-center border-bottom'>
                  <span className='mr-1'>Age: {user.age}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}
UserDetails.protoType = {
  firestore: PropTypes.object.isRequired,
};
export default compose(
  firestoreConnect((props) => [
    { collection: "users", storeAs: "user", doc: props.match.params.id },
  ]),
  connect((state, props) => ({
    user: state.firestore.ordered.user && state.firestore.ordered.user[0],
    auth: state.firebase.auth,
  }))
)(UserDetails);
