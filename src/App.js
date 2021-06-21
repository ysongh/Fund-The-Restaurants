import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Portis from '@portis/web3';
import Web3 from 'web3';

import { portisId } from './config';
import { GlobalProvider } from './context/GlobalState';
import './App.css';
import Alert from './components/common/Alert';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import RestaurantsBlockchain from './abis/Restaurants.json';
import Token from './abis/Token.json';
import Restaurants from './components/Restaurants';
import Restaurant from './components/Restaurant';
import AddRestaurant from './components/AddRestaurant';
import MyTokens from './components/MyTokens';
import WalletModal from './components/WalletModal';

class App extends Component{
  state = {
    account: '',
    restaurantCount: 0,
    totalSupply: 0,
    restaurantsBlockchain: null,
    restaurantsBlockchainAddress: "",
    tokenBlockchain: null,
    restaurants: [],
    donationList: [],
    tokens: [],
    ethPrice: 0,
    currentNetwork: "MATIC",
    portis: null,
    loading: false
  }

  async connectToBlockchain(walletType){
    if (walletType === 'Metamask') await this.loadWeb3();

    await this.loadBlockchainData(walletType);
    await this.getRestaurant();

    const ethValue = await this.getPrice();
    this.setState({ ethPrice: ethValue });
  }

  async loadBlockchainData(walletType){
    let web3;

    if(walletType === 'Metamask') web3 = window.web3;
    else{
      const portis = new Portis(portisId, this.state.currentNetwork === 'ETH' ? 'kovan' : 'maticMumbai');
      this.setState({ portis });
      web3 = new Web3(portis.provider);
      window.web3 = web3;
    }

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const TokenData = Token.networks[networkId];

    if(TokenData){
      const abi = Token.abi;
      const address = Token.networks[networkId].address;

      const tokenBlockchain = new web3.eth.Contract(abi, address);
      this.setState({ tokenBlockchain });
    }else{
      window.alert('Token Contract is not deployed to detected network.')
    }

    const networkData = await RestaurantsBlockchain.networks[networkId];

    if(networkData){
      const abi = RestaurantsBlockchain.abi;
      const address = RestaurantsBlockchain.networks[networkId].address;
      this.setState({ restaurantsBlockchainAddress: address });

      const restaurantsBlockchain = new web3.eth.Contract(abi, address);
      this.setState({ restaurantsBlockchain });

      const restaurantCount = await restaurantsBlockchain.methods.restaurantCount().call();
      this.setState({ restaurantCount });

      const totalSupply = await restaurantsBlockchain.methods.totalSupply().call();
      this.setState({ totalSupply: totalSupply });

      for(let i = 1; i <= totalSupply; i++){
        const tokenOwner = await restaurantsBlockchain.methods.ownerOf(i).call();
        
        if(tokenOwner === accounts[0]){
          let tokenURI = await restaurantsBlockchain.methods.tokenURI(i).call();
          let data = await restaurantsBlockchain.methods.nft(i).call();
          this.setState({
            tokens: [...this.state.tokens, {
              id: i,
              tokenURI,
              name: data.name,
              red: data.red,
              green: data.green,
              blue: data.blue,
              amount: data.amount
            }]
          });
        }
      }
    }else{
      window.alert('Restaurants contract is not deployed to detected network.')
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

  async getRestaurant(){
    for(let i = 0; i < this.state.restaurantCount; i++){
      const restaurant = await this.state.restaurantsBlockchain.methods.restaurants(i + 1).call();
      this.setState({ restaurants: [...this.state.restaurants, restaurant] });
    }
  }

  async createRestaurant(name, location, imageURL, description, amount){
    const data = await this.state.restaurantsBlockchain.methods
      .createRestaurant(name, description, location, imageURL, window.web3.utils.toWei(amount.toString(), 'Ether'))
      .send({ from: this.state.account });

    this.setState({ restaurants: [...this.state.restaurants, data.events.RestaurantCreated.returnValues] });
  }

  async donateRestaurant(id, amount, imageURL, restaurantName ){
    const res = await this.state.restaurantsBlockchain.methods
      .donateETHToRestaurant(id, imageURL)
      .send({ from: this.state.account, value: window.web3.utils.toWei(amount.toString(), 'Ether') });
    
    const tokenId = res.events.Transfer.returnValues.tokenId;

    const tokenURI = await this.state.restaurantsBlockchain.methods.tokenURI(tokenId).call();
    const data = await this.state.restaurantsBlockchain.methods.nft(tokenId).call();
    const newToken = {
      id: tokenId,
      name: restaurantName,
      tokenURI,
      red: data.red,
      green: data.green,
      blue: data.blue,
      amount: window.web3.utils.toWei(amount.toString(), 'Ether')
    }
    this.setState({
      tokens: [...this.state.tokens, newToken]
    });

    return newToken;
  }

  async donateRestaurantWithReferrer(id, amount, imageURL, restaurantName, referrerAddress){
    const res = await this.state.restaurantsBlockchain.methods
      .donateETHToRestaurantWithReferrer(id, imageURL, referrerAddress)
      .send({ from: this.state.account, value: window.web3.utils.toWei(amount.toString(), 'Ether') });
    console.log(res)
    const tokenId = res.events.Transfer.returnValues.tokenId;

    const tokenURI = await this.state.restaurantsBlockchain.methods.tokenURI(tokenId).call();
    const data = await this.state.restaurantsBlockchain.methods.nft(tokenId).call();
    const newToken = {
      id: tokenId,
      name: restaurantName,
      tokenURI,
      red: data.red,
      green: data.green,
      blue: data.blue,
      amount: window.web3.utils.toWei(amount.toString(), 'Ether')
    }
    this.setState({
      tokens: [...this.state.tokens, newToken]
    });

    return newToken;
  }

  async getDonationLog(restaurantId){
    const transactions = await this.state.restaurantsBlockchain?.getPastEvents('DonationForRestaurant', { fromBlock: 0, toBlock: 'latest' });
    this.setState({ donationList: transactions?.filter(transaction => transaction.returnValues.restaurantId === restaurantId ) });
  }

  async changeColor(tokenId){
    const res = await this.state.restaurantsBlockchain.methods
      .changeColorOfNFT(tokenId)
      .send({ from: this.state.account });

    let temp = [...this.state.tokens];
    for(let token of temp){
      if(token.id === tokenId){
        token.red = res.events.ChangeColor.returnValues.red
        token.green = res.events.ChangeColor.returnValues.green
        token.blue = res.events.ChangeColor.returnValues.blue
      }
    }
    
    this.setState({ tokens: [...temp] });
  }

  async getPrice(){
    const ethPrice = await this.state.restaurantsBlockchain.methods.getLatestPrice().call()
    return ethPrice;
  }

  setLoading(){
    this.setState({ loading: !this.state.loading})
  }

  reset(){
    this.setState({
      restaurants: [],
      donationList: [],
      tokens: []
    })
  }

  changeNetwork(value){
    this.setState({ currentNetwork: value });
  }

  render(){
    return (
      <GlobalProvider>
        <Router className="App">
          <Navbar
            loading={this.state.loading}
            currentNetwork={this.state.currentNetwork}
            portis={this.state.portis}
            reset={this.reset.bind(this)} />
          <Alert />
          <Switch>
            <Route path="/mytokens">
              <MyTokens
                changeColor={this.changeColor.bind(this)}
                tokenBlockchain={this.state.tokenBlockchain}
                tokens={this.state.tokens}
                currentNetwork={this.state.currentNetwork} />
            </Route>
            <Route path="/add-restaurant">
              <AddRestaurant
                createRestaurant={this.createRestaurant.bind(this)}
                getPrice={this.getPrice.bind(this)}
                currentNetwork={this.state.currentNetwork} />
            </Route>
            <Route path="/restaurant/:id/:referrerAddress">
              <Restaurant
                account={this.state.account}
                restaurants={this.state.restaurants}
                donationList={this.state.donationList}
                donateRestaurant={this.donateRestaurant.bind(this)}
                donateRestaurantWithReferrer={this.donateRestaurantWithReferrer.bind(this)}
                getDonationLog={this.getDonationLog.bind(this)}
                getPrice={this.getPrice.bind(this)}
                currentNetwork={this.state.currentNetwork} />
            </Route>
            <Route path="/restaurant/:id">
              <Restaurant
                account={this.state.account}
                restaurants={this.state.restaurants}
                donationList={this.state.donationList}
                donateRestaurant={this.donateRestaurant.bind(this)}
                getDonationLog={this.getDonationLog.bind(this)}
                getPrice={this.getPrice.bind(this)}
                ethPrice={this.state.ethPrice}
                currentNetwork={this.state.currentNetwork} />
            </Route>
            <Route path="/">
              <Restaurants
                loading={this.state.loading}
                restaurants={this.state.restaurants}
                ethPrice={this.state.ethPrice}
                restaurantsBlockchainAddress={this.state.restaurantsBlockchainAddress}
                currentNetwork={this.state.currentNetwork} />
            </Route>
          </Switch>

          <WalletModal
            connectToBlockchain={this.connectToBlockchain.bind(this)}
            changeNetwork={this.changeNetwork.bind(this)}
            setLoading={this.setLoading.bind(this)} />
          <Footer />
        </Router>
      </GlobalProvider>
    );
  }
}

export default App;
