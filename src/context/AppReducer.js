export default (state, action) => {
    switch(action.type){
        case "SET_WALLETADDRESS":
            return{
                ...state,
                walletAddress: action.payload
            }
        default:
            return state;
    }
}