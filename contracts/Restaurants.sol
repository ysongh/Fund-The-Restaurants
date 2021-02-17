pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Restaurants is ERC721 {
  uint public restaurantCount = 0;
  mapping(uint => Restaurant) public restaurants;
  mapping(uint => NFT) public nft;

  constructor() ERC721("FundRestaurantsToken", "FRT") public {}

  struct Restaurant {
    uint restaurantId;
    string name;
    string description;
    string location;
    string imageURL;
    uint donationNeeded;
    uint date;
    address payable owner;
  }

  struct NFT {
    uint red;
    uint green;
    uint blue;
  }

  event RestaurantCreated (
    uint restaurantId,
    string name,
    string description,
    string location,
    string imageURL,
    uint donationNeeded,
    uint date,
    address payable owner
  );

  event DonationForRestaurant (
    uint restaurantId,
    uint amount,
    uint donationNeeded,
    uint date,
    address from,
    address payable owner
  );

  function createRestaurant(string memory _name, string memory _description, string memory _location, string memory _imageURL, uint donationNeeded) public {
    restaurantCount++;

    restaurants[restaurantCount] = Restaurant(restaurantCount, _name, _description, _location, _imageURL, donationNeeded, now, msg.sender);
    emit RestaurantCreated(restaurantCount, _name, _description, _location, _imageURL, donationNeeded, now, msg.sender);
  }

  function donateETHToRestaurant(uint _restaurantId, string memory _tokenURI) public payable {
    Restaurant memory _restaurant = restaurants[_restaurantId];

    require(_restaurant.donationNeeded >= msg.value);
    _restaurant.owner.transfer(msg.value);

    _restaurant.donationNeeded -= msg.value;
    restaurants[_restaurantId] = _restaurant;

    // Create NFT
    uint _tokenId = totalSupply().add(1);
    _safeMint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, _tokenURI);

    // Random color
    uint red = getRandomValue(253);
    uint green = getRandomValue(254);
    uint blue = getRandomValue(255);
    nft[_tokenId] = NFT(red, green, blue);

    emit DonationForRestaurant(_restaurantId, msg.value, _restaurant.donationNeeded, now, msg.sender, _restaurant.owner);
  }

  function getRandomValue(uint mod) internal view returns(uint) {
    return uint(keccak256(abi.encodePacked(now, block.difficulty, msg.sender))) % mod;
  }
}