import React, { useState } from 'react';

function AddRestaurant(){
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  function addRestaurant(){
    console.log(name, location, imageURL, description, amount);
  }

  return(
    <div className="container">
      <h1>Add Restaurant</h1>

      <div className="row">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Name of the Restaurant</label>
                <input
                  className="form-control"
                  type="text"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  className="form-control"
                  type="text"
                  name="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  className="form-control"
                  type="text"
                  name="imageURL"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  className="form-control"
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  rows="7"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}  />
              </div>

              <button className="btn btn-primary btn-block" onClick={addRestaurant}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default AddRestaurant;