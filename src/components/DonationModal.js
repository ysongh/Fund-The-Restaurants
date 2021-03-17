import React, { useState } from 'react';
import Confetti from 'react-confetti'

import Spinner from './common/Spinner';

function DonationModal({ getDonationLog, donateRestaurant, donateRestaurantWithReferrer, id, imageURL, restaurantName, referrerAddress, getPrice, currentNetwork }){
  const [amount, setAmount] = useState('');
  const [showAward, setShowAward] = useState(false);
  const [nft, setNFT] = useState({});
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  
  async function donate(){
    try{
      setLoading(true);
      let res;

      if(referrerAddress !== undefined){
        res = await donateRestaurantWithReferrer(id, amount, imageURL, restaurantName, referrerAddress);
      }
      else{
        res = await donateRestaurant(id, amount, imageURL, restaurantName);
      }

      await getDonationLog(id);
      setNFT(res);
      setShowAward(true);
    }
    catch(err){
      console.error(err);
      setLoading(false);
    }
  }

  const handleAmount = async e => {
    setAmount(e.target.value);
    const usdValue = await getPrice();
    let totalUSDValue = (usdValue * e.target.value) / 100000000;
    setPrice(Number.parseFloat(totalUSDValue).toFixed(2));
  }

  return(
    <div className="container my-5">
      <div className="modal fade" id="donationModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Donate {currentNetwork}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              { !showAward ? (
                <div className="form-group mt-3 mb-4">
                  <label className="text-muted font-weight-bold" htmlFor="text">Amount</label>
                  <div class="input-group mb-3">
                    <input
                        className="form-control"
                        name="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => handleAmount(e)} 
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">{currentNetwork}</span>
                    </div>
                  </div>
                  <p className="lead">${price}</p>
                </div>
              ) : (
                <>
                  <h2 className="text-center mb-3">You Earn NFT!</h2>
                  <div className="card" style={{ background: `rgb(${nft.red}, ${nft.green}, ${nft.blue})`}}>
                    <div className="card-body px-4">
                      
                      <img className="img-rounded" src={nft.tokenURI ? `https://ipfs.infura.io/ipfs/${nft.tokenURI}` : '/images/no-image.png'} alt="NFT" />
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
          <Confetti
            width={500}
            numberOfPieces={100}
            run={showAward}
          />
        </div>
      </div>
    </div>
  )
}

export default DonationModal;