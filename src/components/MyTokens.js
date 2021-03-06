import React from 'react';

function MyTokens({ tokens }){
  return(
    <div className="container">
      <h1 className="my-3">My Tokens</h1>

      <div className="row">
        {tokens.map(token => {
          return(
            <div className="col-6 col-md-4 col-lg-3 mb-3" key={token.id}>
              <div className="card" style={{ background: `rgb(${token.red}, ${token.green}, ${token.blue})`}}>
                <div className="card-body px-4">
                  <center>
                    <span className="badge badge-warning text-center">{token.name}</span>
                  </center>
                  
                  <img className="img-rounded" src={`https://ipfs.infura.io/ipfs/${token.tokenURI}`} alt="NFT" />

                  <center>
                    {token.amount.toString() !== '0' ? (
                      <span className="badge secondary-bg-color">
                        Donate {window.web3.utils.fromWei(token.amount.toString(), 'Ether')} ETH
                      </span>
                    ) : (
                      <span className="badge secondary-bg-color">
                        Share
                      </span>
                    )}
                    
                  </center>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyTokens;