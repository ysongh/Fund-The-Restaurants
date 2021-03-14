import React from 'react';
import { Link } from 'react-router-dom';
import Identicon from 'identicon.js';

function Navbar({ account, currentNetwork }){
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand text-secondary-color" to="/">
          <img className="logo" src="/images/logo.png" alt="Logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
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
          <ul className="navbar-nav">
            <li className="nav-item d-flex" data-toggle="collapse" data-target=".navbar-collapse.show">
              <a
                target="_blank"
                className="nav-link text-primary-color"
                rel="noopener noreferrer"
                href={currentNetwork === 'MATIC' ? "https://explorer-mumbai.maticvigil.com/address/" + account : "https://kovan.etherscan.io/address/" + account}>
                {account.substring(0,8)}...{account.substring(34,42)}
              </a>
              {account &&
                <img
                  className="mt-1"
                  width='35'
                  height='35'
                  src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
                  alt="Icon" />
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
