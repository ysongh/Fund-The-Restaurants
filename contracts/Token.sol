pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    bool internal isCreateToken = false;

    constructor() ERC20("Fund The Restaurants", "FTR") public {}

    function createTokens(address _recipient) external {
        require(isCreateToken == false);
        _mint(_recipient, 1000000000000000000000000);
        isCreateToken = true;
    }
}