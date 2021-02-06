import React from 'react';
import { Link } from 'react-router-dom'; 

function Restaurants({ restaurants }){
  return(
    <div className="container">
      <h1 className="my-3">List of Restaurants</h1>

      <div className="row">
        {restaurants.map(restaurant => {
          return(
            <div className="col-12 col-md-6 col-lg-4 mb-3" key={restaurant.restaurantId}>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <Link className="btn primary-bg-color" to={`/restaurant/${restaurant.restaurantId}`}>View</Link>
                  </div>
                  <p>{restaurant.location}</p>
                  <img className="card-img-top" src={restaurant.imageURL} alt="Card image cap" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Restaurants;