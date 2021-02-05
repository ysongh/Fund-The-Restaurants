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
    uint donationGain;
    address payable owner;
  }
}