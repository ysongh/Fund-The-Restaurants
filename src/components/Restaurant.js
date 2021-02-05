import React from 'react';

function Restaurant(){
  return(
    <div className="container">
      <h1>Restaurant Detail</h1>

      <div className="row">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <img className="card-img-top mb-3" src="images/restaurant.png" alt="Card image cap" />
              <h5 className="card-title">Company Name</h5>
              <p>City</p>
              <p>This is a good restaurant</p>
              <button className="btn btn-primary btn-block">Donate</button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Donation Log</h5>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Restaurant;