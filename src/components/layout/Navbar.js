import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand text-secondary-color" to="/">
            Fund My Restaurants
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link className="nav-link text-primary-color" to="/">Home</Link>
              </li>
              <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link className="nav-link text-primary-color" to="/mytokens">My Tokens</Link>
              </li>
              <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link className="nav-link text-primary-color" to="/add-restaurant">Add Restaurants</Link>
              </li>
            </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
