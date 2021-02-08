import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

function AddRestaurant({ createRestaurant }){
  const history = useHistory();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  async function addRestaurant(){
    await createRestaurant(name, location, imageURL, description, amount);
    
    history.push('/');
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-5 m-auto">
          
          <div className="card mt-4">
            <div className="card-body">
              <img className="icon" src="/images/icon1.png" alt="Icon" />
              <h1 className="text-center mb-4">Add Restaurant</h1>

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

              <div className="d-flex justify-content-between">
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
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}  />
              </div>

              <button className="btn primary-bg-color btn-block" onClick={addRestaurant}>
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