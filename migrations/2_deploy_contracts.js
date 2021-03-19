const Token = artifacts.require("Token");
const Restaurants = artifacts.require("Restaurants");

module.exports = async function(deployer){
	await deployer.deploy(Token);
	const token = await Token.deployed();

	await deployer.deploy(Restaurants, token.address);
};