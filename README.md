# Fund The Restaurants
A dapp that allows customers to donate funds to restaurants and earn NFT

- Live Site - https://fund-the-restaurants.web.app/
- Demo - https://youtu.be/Cj3Wk7cqk4Q

## Polygon (Matic Mumbai Testnet) Testnet
- Restaurants Contract Address: [0x4557280882E06721F14429Dc7047BFC3EF92aB11](https://explorer-mumbai.maticvigil.com/address/0x4557280882E06721F14429Dc7047BFC3EF92aB11/transactions)
- Token Contract Address: [0x64fb7e35cA6eB4AD8410b575B165Ea7F2Ad8642c](https://explorer-mumbai.maticvigil.com/address/0x64fb7e35cA6eB4AD8410b575B165Ea7F2Ad8642c/transactions)

## Features
- Customers can donate crypto to restaurants owners
- Restaurant owners can create a post to get funds from someone
- Customers can earn NFT and FTR(ERC20) by donating crypto to restaurants
- Customers can also earn FTR by sharing the link to their friends or families
- Customers can pay 1 FTR to change the background color of their NFTs
- Image is uploaded on IPFS
- Latest price for Matic and ETH using Chainlink Price Feeds

## Technologies
- React
- Bootstrap 4
- Solidity
- Openzeppelin/contracts ERC721.sol and ERC20.sol
- IPFS
- Chainlink Price Feeds

## Running the dapp on local host
- Clone or download this repository
- Run `npm i` to install the dependencies
- Open up Ganache and click "Quickstart"
- Run `truffle migrate` to deploy the contract
- Create a file called 'config.js' on the src folder and add the following code
```
export const portisId = 'Get Portis ID from Portis Dashboard';
```
- Run `npm start` to start the dapp