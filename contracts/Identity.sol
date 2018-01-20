pragma solidity ^0.4.4;

contract Identity {

  mapping(uint => address) idToAddress;
  mapping(address => PersonalIdentity) addressToPersonalIdentity;

  struct PersonalIdentity {
    uint id;
    string fullName;
    uint DOB;
  }

  function Identity() {
    // constructor
  }

  function createIdentity(uint _id, string _name, uint _DOB, address publicAddress) {
    PersonalIdentity identity;
    identity.id = _id;
    identity.fullName = _name;
    identity.DOB = _DOB;

    idToAddress[_id] = publicAddress;
    addressToPersonalIdentity[publicAddress] = identity;
  }

  function getAddress(uint id) returns (address) {
    return idToAddress[id];
  }
  // function getIdentity(address publicAddress) returns (string) {
  //   return idToAddress[publicAddress].fullName;
  // }
}
