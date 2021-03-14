import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const inititalState = {
    walletAddress: ""
}

export const GlobalContext = createContext(inititalState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, inititalState);

    function setWalletAddress(address){
        dispatch({
            type: "SET_WALLETADDRESS",
            payload: address
        })
    }

    return (<GlobalContext.Provider value={{
        walletAddress: state.walletAddress,
        setWalletAddress
    }}>
        {children}
    </GlobalContext.Provider>);
}