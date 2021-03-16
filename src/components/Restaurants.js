import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 

import { GlobalContext } from '../context/GlobalState';
import WalletModal from './WalletModal';

function Restaurants({ connectToBlockchain, restaurants, ethPrice, currentNetwork }){
  const { walletAddress } = useContext(GlobalContext);

  const getUSDValue = restaurant => {
    const totalUSDValue = (ethPrice * +window.web3.utils.fromWei(restaurant.donationNeeded.toString(), 'Ether')) / 100000000;
    return <span className="badge badge-secondary donation-needed">Need ${Number.parseFloat(totalUSDValue).toFixed(2)}</span>
  }
  return(
    <div className="container" style={{ minHeight: '65vh'}}>
      <div className="jumbotron my-3">
        <h1 className="">Support these restaurants</h1>
        <p className="lead">You can help them by donating some {currentNetwork} and earn NFT</p>
        <hr className="my-4"></hr>
        <p>If you are an restaurant owner that need funds, you can fill out the form to create a post</p>
        {walletAddress ? <p className="lead">
          <Link className="btn primary-bg-color btn-lg" to="/add-restaurant" role="button">Get Started</Link>
        </p> : <button className="btn secondary-bg-color btn-lg" data-toggle="modal" data-target="#walletModal">Open Wallet</button>
        }
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
                  <img
                    className="card-img-top"
                    src={restaurant.imageURL ? `https://ipfs.infura.io/ipfs/${restaurant.imageURL}` : '/images/no-image.png'}
                    alt="Restaurant" />
                  {getUSDValue(restaurant)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <WalletModal connectToBlockchain={connectToBlockchain} />
    </div>
  )
}

export default Restaurants;