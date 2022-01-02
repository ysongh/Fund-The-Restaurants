import React, { useEffect, useContext } from 'react';
import { useParams } from "react-router";
import moment from 'moment';
import $ from 'jquery'; 

import { GlobalContext } from '../context/GlobalState';
import DonationModal from './DonationModal';

function Restaurant({ account, getDonationLog, donateRestaurant, restaurants, donateRestaurantWithReferrer, donationList, getPrice, ethPrice, currentNetwork }){
  const { id, referrerAddress } =  useParams();
  const { walletAddress } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchData() {
      await getDonationLog(id);
    }

    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })

    fetchData();
  }, [id])

  const getUSDValue = () => {
    let totalUSDValue = 0;

    if(restaurants[id - 1]?.donationNeeded){
      totalUSDValue = (ethPrice * +window.web3.utils.fromWei(restaurants[id - 1]?.donationNeeded, 'Ether')) / 100000000;
    }

    return (
      <h5 className="card-title">
        Need ${Number.parseFloat(totalUSDValue).toFixed(2)}
      </h5>
    )
  }

  return(
    <div className="container">
      <h1 className="my-3">Restaurant Detail</h1>

      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <div className="card">
            <div className="card-body">
              <img
                className="card-img-top mb-3"
                src={restaurants[id - 1]?.imageURL ? `https://ipfs.infura.io/ipfs/${restaurants[id - 1]?.imageURL}` : '/images/no-image.png'}
                alt="Restaurant" />
              
              <div className="d-flex justify-content-between align-items-center">
                {getUSDValue()}
                <button
                  className="btn secondary-bg-color"
                  onClick={() => {navigator.clipboard.writeText(`${window.location.origin}/restaurant/${id}/${account}`)}}
                  data-toggle="tooltip"
                  data-placement="right"
                  data-trigger="focus"
                  title="Copied"
                >
                  Share
                </button>
              </div>
              
              <p className="lead m-0">{restaurants[id - 1]?.name}</p>
              <p>{restaurants[id - 1]?.location}</p>
              <p className="text-secondary">{restaurants[id - 1]?.description}</p>
              
              {walletAddress ? <button className="btn primary-bg-color btn-block" data-toggle="modal" data-target="#donationModal">
                Donate
              </button> : <p className="lead text-center text-danger">Connect to your wallet to donate</p> }
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Donation Log</h5>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">From</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      { donationList?.map((transaction, key) => {
                        return (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{moment.unix(transaction.returnValues.date).format('M/D/Y h:mm:ss A')}</td>
                            <td>{transaction.returnValues.from.substring(0, 7)}...{transaction.returnValues.from.substring(35, 42)}</td>
                            <td>{window.web3.utils.fromWei(transaction.returnValues.amount, 'ether')} {currentNetwork}</td>
                          </tr>
                        )
                      }) }
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DonationModal
        getDonationLog={getDonationLog}
        donateRestaurant={donateRestaurant}
        donateRestaurantWithReferrer={donateRestaurantWithReferrer}
        id={id}
        imageURL={restaurants[id - 1]?.imageURL}
        restaurantName={restaurants[id - 1]?.name}
        referrerAddress={referrerAddress}
        getPrice={getPrice}
        currentNetwork={currentNetwork}
        walletAddress={walletAddress} />
    </div>
  )
}

export default Restaurant;