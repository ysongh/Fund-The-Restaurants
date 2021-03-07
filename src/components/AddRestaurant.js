import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ipfsClient from 'ipfs-http-client';

import Spinner from './common/Spinner';

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function AddRestaurant({ createRestaurant }){
  const history = useHistory();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState('');
  const [buffer, setBuffer] = useState('');

  async function addRestaurant(){
    try{
      setLoading(true);

      ipfs.add(buffer, async (error, result) => {
        if(error) {
          console.error(error);
        }
        await createRestaurant(name, location, result[0].hash, description, amount);
        history.push('/');
        setLoading(false);
      });
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
              <div className="form-group">
                <label>File</label>
                <br />
                <input className="text-white text-monospace" type="file" onChange={getFile} />
                <p>{filename && filename}</p>
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
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}  />
              </div>

              {!loading ? (
                <button className="btn primary-bg-color btn-block" onClick={addRestaurant}>
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