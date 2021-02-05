pragma solidity ^0.6.12;

contract Restaurants {
  string public name = "Restaurants";
  uint public restaurantCount = 0;
  mapping(uint => Restaurant) public restaurants;

  struct Restaurant {
    uint restaurantId;
    string name;
    string description;
    string location;
    string imageURL;
    uint donationGain;
    address payable owner;
  }

  event RestaurantCreated (
    uint restaurantId,
    string name,
    string description,
    string location,
    string imageURL,
    uint donationGain,
    address payable owner
  );

  function createRestaurant(string memory _name, string memory _description, string memory _location, string memory _imageURL, uint _donationGain) public {
    restaurantCount++;

    restaurants[restaurantCount] = Restaurant(restaurantCount, _name, _description, _location, _imageURL, _donationGain, msg.sender);
    emit RestaurantCreated(restaurantCount, _name, _description, _location, _imageURL, _donationGain, msg.sender);
  }
}