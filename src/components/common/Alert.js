import React from 'react';

function Alert(){
  return(
    <div className="alert alert-info alert-dismissible fade show" role="alert">
        <p className="text-center m-0">
            Contract currently works on the Kovan and Matic Mumbai Test Network
        </p>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
  )
}

export default Alert;