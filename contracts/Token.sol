// SPDX-License-Identifier: MIT

/**
    ## Disclaimer
    These contracts are not audited.  Please review this code on your own before
    using any of the following code for production.  I will not be responsible or
    liable for all loss or damage caused from this project.
*/

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

    function payOneToken(address _sender, address _recipient) external {
        _transfer(_sender, _recipient, 1000000000000000000);
    }
}