const { assert } = require('chai');

const Restaurants = artifacts.require("Restaurants");

function tokensToWei(val) {
    return web3.utils.toWei(val, 'ether');
}

contract('Restaurants', ([deployer, account1]) => {
    let restaurants;

    before(async() => {
        restaurants = await Restaurants.new();
    });

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = await restaurants.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('has correct name', async() => {
            const name = await restaurants.name();
            assert.equal(name, "Restaurants");
        });
    });
})