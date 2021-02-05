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

    describe('restaurant', async() => {
        let result;
        let restaurantCount;

        const restaurantName = "Some Company";
        const restaurantDescription = "This is a restaurant";
        const restaurantLocation = "123 Test St";
        const restaurantImageURL = "https:image1dio23jipadijai.com";
        const restaurantDonationGain = 1;

        before(async() => {
            result = await restaurants.createRestaurant(restaurantName, restaurantDescription, restaurantLocation, restaurantImageURL, restaurantDonationGain, { from: account1 });
            restaurantCount = await restaurants.restaurantCount();
        });

        it('create restaurant', async() => {
            const event = result.logs[0].args;
            assert.equal(event.restaurantId.toNumber(), restaurantCount.toNumber(), 'Id is correct');
            assert.equal(event.name, restaurantName, 'Name is correct');
            assert.equal(event.description, restaurantDescription, 'Description is correct');
            assert.equal(event.location, restaurantLocation, 'Location is correct');
            assert.equal(event.imageURL, restaurantImageURL, 'Image URL is correct');
            assert.equal(event.donationGain, restaurantDonationGain, 'Donation amount is correct');
            assert.equal(event.owner, account1, 'Owner is correct');
        });

        it('has correct restaurant count', async() => {
            assert.equal(restaurantCount, 1);
        });

        it('has correct list of restaurants', async() => {
            const restaurant = await restaurants.restaurants(restaurantCount);
            assert.equal(restaurant.restaurantId.toNumber(), restaurantCount.toNumber(), 'Id is correct');
            assert.equal(restaurant.name, restaurantName, 'Name is correct');
            assert.equal(restaurant.description, restaurantDescription, 'Description is correct');
            assert.equal(restaurant.location, restaurantLocation, 'Location is correct');
            assert.equal(restaurant.imageURL, restaurantImageURL, 'Image URL is correct');
            assert.equal(restaurant.donationGain, restaurantDonationGain, 'Donation amount is correct');
            assert.equal(restaurant.owner, account1, 'Owner is correct');
        });
    });
})