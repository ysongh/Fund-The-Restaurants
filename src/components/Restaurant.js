import React from 'react';
import { useParams } from "react-router";

function Restaurant({ restaurants }){
  const { id } =  useParams();

  return(
    <div className="container">
      <h1>Restaurant Detail</h1>

      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <div className="card">
            <div className="card-body">
              <img className="card-img-top mb-3" src={restaurants[id - 1]?.imageURL} alt="Card image cap" />
              <h5 className="card-title">{restaurants[id - 1]?.name}</h5>
              <p>{restaurants[id - 1]?.location}</p>
              <p>{restaurants[id - 1]?.description}</p>
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