const Restaurants = artifacts.require("Restaurants");

module.exports = async function(deployer){
	deployer.deploy(Restaurants);
};