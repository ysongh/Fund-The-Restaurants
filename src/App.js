import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Web3 from 'web3';

import './App.css';
import RestaurantsBlockchain from './abis/Restaurants.json';
import Restaurants from './components/Restaurants';
import Restaurant from './components/Restaurant';

class App extends Component{
  state = {
    account: '',
    restaurantsBlockchain: null
  }

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData(){
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = RestaurantsBlockchain.networks[networkId];

    if(networkData){
      const abi = RestaurantsBlockchain.abi;
      const address = RestaurantsBlockchain.networks[networkId].address;

      const restaurantsBlockchain = new web3.eth.Contract(abi, address);
      this.setState({ restaurantsBlockchain });
    }else{
      window.alert('Contract is not deployed to detected network')
    }
  }

  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  render(){
    return (
      <Router className="App">
        <Switch>
          <Route path="/restaurant">
            <Restaurant />
          </Route>
          <Route path="/">
            <Restaurants />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
