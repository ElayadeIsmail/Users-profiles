import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.ageInput = React.createRef();
    this.phoneInput = React.createRef();
    this.imageUrlInput = React.createRef();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { firestore, user, history } = this.props;
    const uptUser = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      age: this.ageInput.current.value,
      phone: this.phoneInput.current.value,
      imageUrl: this.imageUrlInput.current.value,
    };
    console.log(uptUser);
    firestore
      .update({ collection: "users", doc: user.id }, uptUser)
      .then(() => history.push("/"));
  };
  render() {
    const { user } = this.props;
    if (user) {
      return (
        <div>
          <Link to='/' className='btn btn-link text-danger'>
            <i className='fas fa-arrow-circle-left'></i> Profiles
          </Link>
          <div className='card'>
            <div className='card-header bg-danger text-light'>Edit User</div>
            <div className='card-body bg-dark text-light'>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <label htmlFor='firstName'>First Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='firstName'
                    ref={this.firstNameInput}
                    defaultValue={user.firstName}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='lastName'>Last Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='lastName'
                    ref={this.lastNameInput}
                    defaultValue={user.lastName}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    ref={this.emailInput}
                    defaultValue={user.email}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='phone'>Phone</label>
                  <input
                    type='text'
                    className='form-control'
                    name='phone'
                    ref={this.phoneInput}
                    defaultValue={user.phone}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='age'>Age</label>
                  <input
                    type='text'
                    className='form-control'
                    name='age'
                    ref={this.ageInput}
                    defaultValue={user.age}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='imageUrl'>Image Url</label>
                  <input
                    type='text'
                    className='form-control'
                    name='imageUrl'
                    ref={this.imageUrlInput}
                    defaultValue={user.imageUrl}
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
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}
UserEdit.protoType = {
  firestore: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect((props) => [
    { collection: "users", storeAs: "user", doc: props.match.params.id },
  ]),
  connect((state, props) => ({
    user: state.firestore.ordered.user && state.firestore.ordered.user[0],
  }))
)(UserEdit);
