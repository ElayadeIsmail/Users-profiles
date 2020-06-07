import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";

class AddUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    phone: "",
    imageUrl: "",
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const NewUser = this.state;
    const { firestore, history } = this.props;
    firestore
      .add({ collection: "users" }, NewUser)
      .then(() => history.push("/"));
  };
  render() {
    return (
      <div>
        <Link to='/' className='btn btn-link text-danger'>
          <i className='fas fa-arrow-circle-left'></i> Profiles
        </Link>
        <div className='card'>
          <div className='card-header'>ADD User</div>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='firstName'>First Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='firstName'
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='lastName'
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='phone'>Phone</label>
                <input
                  type='text'
                  className='form-control'
                  name='phone'
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='age'>Age</label>
                <input
                  type='text'
                  className='form-control'
                  name='age'
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='imageUrl'>Image Url</label>
                <input
                  type='text'
                  className='form-control'
                  name='imageUrl'
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
      </div>
    );
  }
}

export default firestoreConnect()(AddUser);
