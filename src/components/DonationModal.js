import React, { useState } from 'react';

import Spinner from './common/Spinner';

function DonationModal({ donateRestaurant, id, imageURL}){
  const [amount, setAmount] = useState('');
  const [showAward, setShowAward] = useState(false);
  const [nft, setNFT] = useState({});
  const [loading, setLoading] = useState(false);
  
  async function donate(){
    try{
      setLoading(true);
      const res = await donateRestaurant(id, amount, imageURL);
      setNFT(res);
      setShowAward(true);
    }
    catch(err){
      console.error(err);
      setLoading(false);
    }
  }

  return(
    <div className="container my-5">
      <div className="modal fade" id="donationModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Donate ETH</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              { !showAward ? (
                <div className="form-group mt-3 mb-4">
                  <label className="text-muted font-weight-bold" htmlFor="text">Amount</label>
                  <input
                      className="form-control"
                      name="Amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)} 
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-center mb-3">You Earn NFT!</h2>
                  <div className="card" style={{ background: `rgb(${nft.red}, ${nft.green}, ${nft.blue})`}}>
                    <div className="card-body px-4">
                      <img className="img-rounded" src={nft.tokenURI} alt="NFT" />
                    </div>
                  </div>
                </>
              ) }
              
            </div>

            <div className="modal-footer">
              { !showAward ? (
                <>
                  <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
                  {!loading ? (
                    <button
                      className="btn primary-bg-color"
                      onClick={donate}>
                        Send
                    </button>
                  ) : (
                    <Spinner />
                  ) }
                  
                </>
                ) : (
                  <button type="button" className="btn btn-light" data-dismiss="modal">Close</button>
                ) }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationModal;