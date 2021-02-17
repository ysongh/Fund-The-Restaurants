import React, { useEffect } from 'react';
import { useParams } from "react-router";
import moment from 'moment';

import DonationModal from './DonationModal';

function Restaurant({ getDonationLog, donateRestaurant, restaurants, donationList }){
  const { id } =  useParams();

  useEffect(() => {
    async function fetchData() {
      await getDonationLog(id);
    }

    fetchData();
  }, [])

  return(
    <div className="container">
      <h1 className="my-3">Restaurant Detail</h1>

      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <div className="card">
            <div className="card-body">
              <img className="card-img-top mb-3" src={restaurants[id - 1]?.imageURL} alt="Restaurant" />
              <h5 className="card-title">{restaurants[id - 1]?.name}</h5>
              <p>{restaurants[id - 1]?.location}</p>
              <p>{restaurants[id - 1]?.description}</p>
              <p>{restaurants[id - 1] && window.web3.utils.fromWei(restaurants[id - 1].donationNeeded.toString(), 'Ether')} ETH</p>
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
      
      <DonationModal donateRestaurant={donateRestaurant} id={id} imageURL={restaurants[id - 1]?.imageURL} />
    </div>
  )
}

export default Restaurant;