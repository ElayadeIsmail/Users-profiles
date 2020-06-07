import React from "react";
import { Link } from "react-router-dom";
import "./user.css";

const User = (props) => {
  const { user } = props;
  return (
    <div className='row row1 w-100  mb-2'>
      <div className='col-sm-4 mx-auto align-self-center'>
        <div className='img-container'>
          <img
            src={user.imageUrl}
            alt='Profile'
            className='card-img rounded-circle'
          />
        </div>
      </div>
      <div className='col-sm-4 mx-auto  align-self-center justify-self-center'>
        <h3 className='display-5'>
          {user.firstName} {user.lastName}
        </h3>
      </div>
      <div className='col-sm-4 mx-auto  align-self-center'>
        <Link to={`/user/${user.id}`} className='btn btn-outline-danger'>
          Details
        </Link>
      </div>
      <div
        className='my-2'
        style={{
          width: "100%",
          height: "1px",
          background: "rgb(128, 128, 128)",
        }}
      ></div>
    </div>
  );
};

export default User;
