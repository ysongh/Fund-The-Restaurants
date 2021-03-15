import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ipfsClient from 'ipfs-http-client';

import Spinner from './common/Spinner';

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function AddRestaurant({ createRestaurant, getPrice, currentNetwork }){
  const history = useHistory();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState('');
  const [buffer, setBuffer] = useState('');
  const [price, setPrice] = useState(0);

  async function addRestaurant(){
    try{
      setLoading(true);

      if(buffer){
        ipfs.add(buffer, async (error, result) => {
          if(error) {
            console.error(error);
          }
          await createRestaurant(name, location, result[0].hash, description, amount);
          history.push('/');
        });
      }
      else{
        await createRestaurant(name, location, '', description, amount);
        history.push('/');
      }

      setLoading(false);
    }
    catch(err){
      console.error(err);
      setLoading(false);
    }
  }

  const getFile = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFilename(file.name);
      setBuffer(Buffer(reader.result));
    }
  }

  const handleAmount = async e => {
    setAmount(e.target.value);
    const usdValue = await getPrice();
    let totalUSDValue = (usdValue * e.target.value) / 100000000;
    setPrice(Number.parseFloat(totalUSDValue).toFixed(2));
  }

  return(
    <div className="addRestaurant container">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-5 m-auto">
          
          <div className="card mt-4">
            <div className="card-body">
              <img className="icon" src="/images/icon1.png" alt="Icon" />
              <h1 className="text-center mb-4">Add Restaurant</h1>

              <div className="form-group">
                <label>Name of the Restaurant *</label>
                <input
                  className="form-control"
                  type="text"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input
                  className="form-control"
                  type="text"
                  name="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Image of your restarurant</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" onChange={getFile} />
                    <label className="custom-file-label">{filename ? filename : "Choose file"}</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Amount *</label>
                <div className="d-flex align-items-center">
                  <div className="input-group mb-3 w-50">
                    <input
                      className="form-control "
                      type="number"
                      name="amount"
                      value={amount}
                      onChange={(e) => handleAmount(e)} 
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">{currentNetwork}</span>
                    </div>
                  </div>
                  <p className="addRestaurant__price w-50 text-right">${price}</p>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}  />
              </div>

              {!loading ? (
                <button
                  className="btn primary-bg-color btn-block"
                  onClick={addRestaurant}
                  disabled={!name || !location || !amount || !description}>
                  Create
                </button>
              ) : (
                <center>
                  <Spinner />
                </center>
              ) }
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default AddRestaurant;