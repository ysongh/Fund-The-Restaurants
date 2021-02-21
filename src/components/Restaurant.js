import React, { useEffect } from 'react';
import { useParams } from "react-router";
import moment from 'moment';
import $ from 'jquery'; 

import DonationModal from './DonationModal';

function Restaurant({ account, getDonationLog, donateRestaurant, restaurants, donateRestaurantWithReferrer, donationList }){
  const { id, referrerAddress } =  useParams();

  useEffect(() => {
    async function fetchData() {
      await getDonationLog(id);
    }

    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })

    fetchData();
  }, [])

  return(
    <div className="container">
      <h1 className="my-3">Restaurant Detail</h1>

      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <div className="card">
            <div className="card-body">
              <img className="card-img-top mb-3" src={`https://ipfs.infura.io/ipfs/${restaurants[id - 1]?.imageURL}`} alt="Restaurant" />
              
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">
                  Need {restaurants[id - 1] && window.web3.utils.fromWei(restaurants[id - 1].donationNeeded.toString(), 'Ether')} BNB
                </h5>
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
              
              <button className="btn primary-bg-color btn-block" data-toggle="modal" data-target="#donationModal">
                Donate
              </button>
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
                            <td>{window.web3.utils.fromWei(transaction.returnValues.amount, 'ether')}</td>
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
        referrerAddress={referrerAddress} />
    </div>
  )
}

export default Restaurant;