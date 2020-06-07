import React from "react";

function PageNotFound() {
  return (
    <div className='row'>
      <div className='col-md-8 mx-auto text-center mt-5'>
        <i className='fa fa-ban fa-10x  text-danger' aria-hidden='true'></i>

        <h1 className='display-3'>
          <span className='text-danger'>Sorry</span> Page Not Found{" "}
        </h1>
      </div>
    </div>
  );
}

export default PageNotFound;
