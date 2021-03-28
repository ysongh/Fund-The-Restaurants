import React, { useEffect, useContext, useState } from 'react';
import Identicon from 'identicon.js';

import { GlobalContext } from '../context/GlobalState';

function MyTokens({ changeColor, tokenBlockchain, tokens, currentNetwork }){
  const { walletAddress } = useContext(GlobalContext);
  const [tokenAmount, setTokenAmount] = useState(0);
  
  useEffect(() => {
    async function getTokenAmount() {
      const tokens = await tokenBlockchain.methods.balanceOf(walletAddress).call();
      setTokenAmount(+window.web3.utils.fromWei(tokens.toString(), 'Ether'));
    }

    getTokenAmount();
  }, [walletAddress])

  const handleClick = async tokenId => {
    await changeColor(tokenId);
    setTokenAmount(tokenAmount - 1);
  }

  return(
    <div className="container" style={{minHeight: '65vh'}}>
      <div className="d-flex align-items-center">
        <h1 className="my-3">My Tokens</h1>
        <img
          className="ml-2"
          width='35'
          height='35'
          src={`data:image/png;base64,${new Identicon(walletAddress, 30).toString()}`}
          alt="Icon" />
      </div>
      
      <p>You have {tokenAmount} FTR - You can pay 1 FTR to change the color of your NFTs</p>

      <div className="row">
        {tokens.map(token => {
          return(
            <div className="col-6 col-md-4 col-lg-3 mb-3" key={token.id}>
              <div className="card" style={{ background: `rgb(${token.red}, ${token.green}, ${token.blue})`}}>
                <div className="card-body px-4">
                  <img className="img-rounded relative" src={token.tokenURI ? `https://ipfs.infura.io/ipfs/${token.tokenURI}` : '/images/no-image.png'} alt="NFT" />

                  <span className="badge secondary-bg-color token__label">
                    <p className="m-0">{currentNetwork}</p>
                    <p className="m-0">{window.web3.utils.fromWei(token.amount.toString(), 'Ether')} </p>
                  </span>

                  <center>
                    <span className="badge badge-warning text-center">{token.name}</span>
                  </center>
                </div>
              </div>

              <center>
                <button className="btn primary-bg-color btn-sm" onClick={() => handleClick(token.id)}>Change Color</button>
              </center>
            </div>
          )
        })}
      </div>
      {!tokens.length && <p className="text-danger lead text-center mt-5">You do not have any NFTs.  You can earn some NFTs by donating some crypto to restaurants.</p>}
    </div>
  )
}

export default MyTokens;