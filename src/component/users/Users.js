import React, { Component } from "react";
import User from "./user/User";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import "./user/user.css";

class Users extends Component {
  render() {
    const { users, auth } = this.props;
    if (users) {
      return (
        <div>
          <div className='row w-100'>
            <div className='col-8'>
              <h3 className='text-dark'>
                <i className='fas fa-users  text-danger'></i> Users
              </h3>
            </div>
            {auth.uid === "4BIjAMkSJqZsvoOeoqSxz5XNgBB2" ? (
              <div className='col-4'>
                <Link to='/user/add' className='btn btn-outline-dark'>
                  <i className='fas fa-plus'></i> New
                </Link>
              </div>
            ) : null}
          </div>
          <table className='table hidden-sm table-striped  my-1'>
            <thead className='thead-inverse'>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th />
              </tr>
            </thead>
          </table>
          {users.map((user) =>
            user.id !== auth.uid ? <User key={user.id} user={user} /> : null
          )}
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect(() => ["users"]), // or { collection: 'todos' }
  connect((state, props) => ({
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
  }))
)(Users);
