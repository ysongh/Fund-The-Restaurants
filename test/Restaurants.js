const { assert } = require('chai');

require('chai')
    .use(require('chai-as-promised'))
    .should();

const Token = artifacts.require("Token");
const Restaurants = artifacts.require("Restaurants");

function tokensToWei(val) {
    return web3.utils.toWei(val, 'ether');
}

contract('Restaurants', ([deployer, account1, account2, account3]) => {
    let token;
    let restaurants;

    before(async() => {
        token = await Token.new();
        restaurants = await Restaurants.new(token.address);
    });

    describe('Token deployment', async() => {
        it('deploys successfully', async() => {
            const address = await token.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('has a name', async () => {
            const name = await token.name();
            assert.equal(name, 'Fund The Restaurants');
        });

        it('has a symbol', async () => {
            const symbol = await token.symbol();
            assert.equal(symbol, 'FTR');
        });

        it('set the total supply to 1,000,000', async() => {
            const totalSupply = await token.totalSupply();
            assert.equal(totalSupply.toString(), tokensToWei('1000000'));
        });

        it('deployer has tokens', async () => {
            let balance = await token.balanceOf(deployer);
            assert.equal(balance.toString(), tokensToWei('1000000'));
        })
    });

    describe('Restaurants deployment', async() => {
        it('deploys successfully', async() => {
            const address = await restaurants.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });
    });

    describe('restaurant', async() => {
        let result;
        let restaurantCount;

        const restaurantName = "Some Company";
        const restaurantDescription = "This is a restaurant";
        const restaurantLocation = "123 Test St";
        const restaurantImageURL = "https:image1dio23jipadijai.com";
        const restaurantDonationNeeded = '10000000000000000000';

        before(async() => {
            result = await restaurants.createRestaurant(restaurantName, restaurantDescription, restaurantLocation, restaurantImageURL, restaurantDonationNeeded, { from: account1 });
            restaurantCount = await restaurants.restaurantCount();
        });

        it('create restaurant', async() => {
            const event = result.logs[0].args;
            assert.equal(event.restaurantId.toNumber(), restaurantCount.toNumber(), 'Id is correct');
            assert.equal(event.name, restaurantName, 'Name is correct');
            assert.equal(event.description, restaurantDescription, 'Description is correct');
            assert.equal(event.location, restaurantLocation, 'Location is correct');
            assert.equal(event.imageURL, restaurantImageURL, 'Image URL is correct');
            assert.notEqual(event.date, null, "Date is not null");
            assert.equal(event.donationNeeded, restaurantDonationNeeded, 'Donation needed is correct');
            assert.equal(event.owner, account1, 'Owner is correct');

            // reject if donation needed is 0
            await restaurants.createRestaurant(restaurantName, restaurantDescription, restaurantLocation, restaurantImageURL, 0, { from: account1 }).should.be.rejected;
            // reject if name is empty
            await restaurants.createRestaurant("", restaurantDescription, restaurantLocation, restaurantImageURL, restaurantDonationNeeded, { from: account1 }).should.be.rejected;
            // reject if description is empty
            await restaurants.createRestaurant(restaurantName, "", restaurantLocation, restaurantImageURL, restaurantDonationNeeded, { from: account1 }).should.be.rejected;
            // reject if location is empty
            await restaurants.createRestaurant(restaurantName, restaurantDescription, "", restaurantImageURL, restaurantDonationNeeded, { from: account1 }).should.be.rejected;
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
            assert.notEqual(restaurant.date, null, "Date is not null");
            assert.equal(restaurant.donationNeeded, restaurantDonationNeeded, 'Donation needed is correct');
            assert.equal(restaurant.owner, account1, 'Owner is correct');
        });
    });

    describe('donate to restaurant ', async() => {
        let result;
        let restaurant;
        let restaurantId = 1;
        let oldDonationNeed;
        
        before(async() => {
            restaurant = await restaurants.restaurants(restaurantId);
            oldDonationNeed = restaurant.donationNeeded;
        });
        
        it('received correct amount', async() => {
            let oldDonatorBalanace = await web3.eth.getBalance(account1);
            oldDonatorBalanace = new web3.utils.BN(oldDonatorBalanace);

            result = await restaurants.donateETHToRestaurant(restaurantId, restaurant.imageURL, { from: account2, value: tokensToWei('1') });
            
            let newDonatorBalanace = await web3.eth.getBalance(account1);
            newDonatorBalanace = new web3.utils.BN(newDonatorBalanace);

            let amount = tokensToWei('1');
            amount = new web3.utils.BN(amount);

            const expectedBalance = oldDonatorBalanace.add(amount);

            assert.equal(newDonatorBalanace.toString(), expectedBalance.toString());

            oldDonationNeed -= +tokensToWei('1');
            
            const event = result.logs[1].args;
            assert.equal(event.restaurantId, restaurantId, 'Restaurant Id is correct');
            assert.equal(event.amount.toString(), tokensToWei('1'), 'Amount is correct');
            assert.equal(event.donationNeeded.toString(), oldDonationNeed, 'Donation needed is correct');
            assert.notEqual(event.date, null, "Date is not null");
            assert.equal(event.from, account2, 'Donator address is correct');
            assert.equal(event.owner, account1, 'Owner address is correct');

            // reject if user donate more than it neededs
            await restaurants.donateETHToRestaurant(restaurantId, { from: account2, value: tokensToWei('50') }).should.be.rejected;
        });

        it('mints tokens for donator', async () => {
            result = await restaurants.totalSupply();
            assert.equal(result.toString(), '1', 'Total supply is correct');

            result = await restaurants.balanceOf(account2);
            assert.equal(result.toString(), '1', 'balanceOf is correct');

            result = await restaurants.ownerOf('1');
            assert.equal(result.toString(), account2.toString(), 'Donator get the token');
            result = await restaurants.tokenOfOwnerByIndex(account2, 0);
            
            let balanceOf = await restaurants.balanceOf(account2);
            let tokenIds = [];

            for(let i = 0; i < balanceOf; i++){
                let id = await restaurants.tokenOfOwnerByIndex(account2, i);
                tokenIds.push(id.toString());
            }
            
            let expected = ['1'];
            assert.equal(tokenIds.toString(), expected.toString(), 'tokenIds is correct');

            let tokenURI = await restaurants.tokenURI('1');
            assert.equal(tokenURI, restaurant.imageURL);
        })

        it('has valid rgb color, name, donation amount', async () => {
            result = await restaurants.nft(1);

            assert.notEqual(result.name, undefined);
            assert.notEqual(result.red, undefined);
            assert.notEqual(result.green, undefined);
            assert.notEqual(result.blue, undefined);
            assert.equal(result.amount, tokensToWei('1'), 'Amount is correct');
            assert.isAtMost(result.red.toNumber(), 255, 'Value must not be greater than 255');
        })
    });

    describe('donate to restaurant with referrer', async() => {
        let result;
        let restaurant;
        let restaurantId = 1;
        
        before(async() => {
            restaurant = await restaurants.restaurants(restaurantId);
            result = await restaurants.donateETHToRestaurantWithReferrer(restaurantId, restaurant.imageURL, account3, { from: account2, value: tokensToWei('1') });
        });
        
        it('donation works', async() => {
            const event = result.logs[2].args;
            assert.equal(event.restaurantId, restaurantId, 'Restaurant Id is correct');
            assert.equal(event.amount.toString(), tokensToWei('1'), 'Amount is correct');
            assert.notEqual(event.date, null, "Date is not null");
            assert.equal(event.from, account2, 'Donator address is correct');
            assert.equal(event.owner, account1, 'Owner address is correct');
        });

        it('mints tokens for donator', async () => {
            result = await restaurants.balanceOf(account2);
            assert.equal(result.toString(), '2', 'Donator total NFT is correct');

            result = await restaurants.ownerOf('2');
            assert.equal(result.toString(), account2.toString(), 'Donator get the token');
            result = await restaurants.tokenOfOwnerByIndex(account2, 0);
            
            let balanceOf = await restaurants.balanceOf(account2);
            let tokenIds = [];

            for(let i = 0; i < balanceOf; i++){
                let id = await restaurants.tokenOfOwnerByIndex(account2, i);
                tokenIds.push(id.toString());
            }
            
            let expected = ['1', '2'];
            assert.equal(tokenIds.toString(), expected.toString(), 'tokenIds is correct');

            let tokenURI = await restaurants.tokenURI('2');
            assert.equal(tokenURI, restaurant.imageURL);
        })

        it('mints tokens for referrer', async () => {
            result = await restaurants.totalSupply();
            assert.equal(result.toString(), '3', 'Total supply is correct');

            result = await restaurants.balanceOf(account3);
            assert.equal(result.toString(), '1', 'Referrer total NFT is correct');

            result = await restaurants.ownerOf('3');
            assert.equal(result.toString(), account3.toString(), 'Referrer get the token');
            result = await restaurants.tokenOfOwnerByIndex(account3, 0);
            
            let balanceOf = await restaurants.balanceOf(account3);
            let tokenIds = [];

            for(let i = 0; i < balanceOf; i++){
                let id = await restaurants.tokenOfOwnerByIndex(account2, i);
                tokenIds.push(id.toString());
            }
            
            let expected = ['1'];
            assert.equal(tokenIds.toString(), expected.toString(), 'tokenIds is correct');

            let tokenURI = await restaurants.tokenURI('3');
            assert.equal(tokenURI, restaurant.imageURL);
        })

        it('has valid rgb color, name, donation amount for donator', async () => {
            result = await restaurants.nft(2);

            assert.notEqual(result.name, undefined);
            assert.notEqual(result.red, undefined);
            assert.notEqual(result.green, undefined);
            assert.notEqual(result.blue, undefined);
            assert.equal(result.amount, tokensToWei('1'), 'Amount is correct');
            assert.isAtMost(result.red.toNumber(), 255, 'Value must not be greater than 255');
        })

        it('has valid rgb color, name, donation amount for referrer', async () => {
            result = await restaurants.nft(3);

            assert.notEqual(result.name, undefined);
            assert.notEqual(result.red, undefined);
            assert.notEqual(result.green, undefined);
            assert.notEqual(result.blue, undefined);
            assert.equal(result.amount, 0, 'Amount is correct');
            assert.isAtMost(result.red.toNumber(), 255, 'Value must not be greater than 255');
        })
    });
})