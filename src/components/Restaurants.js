import React from 'react';
import { Link } from 'react-router-dom'; 

function Restaurants({ restaurants }){
  return(
    <div className="container">
      <div className="jumbotron my-3">
        <h1 className="">Support these restaurants</h1>
        <p className="lead">You can help them by donating some BNB and earn NFT</p>
        <hr className="my-4"></hr>
        <p>If you are an restaurant owner that need funds, you can fill out the form to create a post</p>
        <p className="lead">
          <Link className="btn primary-bg-color btn-lg" to="/add-restaurant" role="button">Get Started</Link>
        </p>
      </div>

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
                  <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${restaurant.imageURL}`} alt="Restaurant" />
                  <span className="badge badge-secondary donation-needed">Need {window.web3.utils.fromWei(restaurant.donationNeeded.toString(), 'Ether')} BNB</span>
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