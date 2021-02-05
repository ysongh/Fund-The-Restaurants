import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Web3 from 'web3';

import './App.css';
import Restaurants from './components/Restaurants';
import Restaurant from './components/Restaurant';

class App extends Component{
  async componentWillMount(){
    await this.loadWeb3();
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
