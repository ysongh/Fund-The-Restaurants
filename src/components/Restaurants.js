import React from 'react';
import { Link } from 'react-router-dom'; 

function Restaurants(){
  return(
    <div className="container">
      <h1>List of Restaurants</h1>

      <div className="row">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">Company Name</h5>
                <Link className="btn btn-primary" to="/restaurant">View</Link>
              </div>
              <p>City</p>
              <img className="card-img-top" src="images/restaurant.png" alt="Card image cap" />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">Company Name</h5>
                <button className="btn btn-primary">View</button>
              </div>
              <p>City</p>
              <img className="card-img-top" src="images/restaurant.png" alt="Card image cap" />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Restaurants;