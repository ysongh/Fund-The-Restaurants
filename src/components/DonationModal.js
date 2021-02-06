import React, { useState } from 'react';

function DonationModal({ donateRestaurant, id }){
  const [amount, setAmount] = useState('');
  
  function donate(){
    donateRestaurant(id, amount);
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
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
              <button
                className="btn primary-bg-color"
                data-dismiss="modal"
                onClick={donate}>
                  Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationModal;