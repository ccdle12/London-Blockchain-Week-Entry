pragma solidity ^0.4.4;

contract Escrow {

  /**
   * Doctor
   */
  address doctor;

  struct Doctor {
    string name;
    uint id;
    address idBox;
  }

  mapping(address => Doctor) identityOfDoctor;


  /**
   * Villager
   */
   struct Villager {
     string name;
     string DOB;
     string gender;
     address id;
     uint256 timeStampOfTreatment;
   }
   mapping(address => Villager) identityOfVillager;
   address villager;


  uint totalRaised;

  /**
   * I'm not sure I need these
   */
  uint[] arrayOfIds;
  uint percentDistributed;
  address facilitator;



  mapping(address => bool) confirmationOfTreatment;
  mapping(address => uint) withdrawableFunds;

  //Event when funds paid
  event FundsContributed();
  event FundsReleased();
  // event VillagerConfirmationTimeStamp();

  function Escrow(uint _totalRaised) {
    // constructor
    totalRaised = _totalRaised;
  }

  function confirmTreatment() returns (uint256) {
    confirmationOfTreatment[msg.sender] = true;

    // Release funds to the middleman/doctor
    releaseFunds();

    // Record timestamp for villager
    identityOfVillager[msg.sender].timeStampOfTreatment = block.timestamp;
    
    return identityOfVillager[msg.sender].timeStampOfTreatment;
  }

  function releaseFunds() internal {
    totalRaised -= 1; // Should be linked to the contract balance
    withdrawableFunds[doctor] += 1; 

    //Emit that the funds have been released to the doctor;
    FundsReleased();
  }

  function retrieveDoctorsAvailableFunds() returns (uint) {
    return withdrawableFunds[doctor];
  }

  function checkAvailableReleasedFunds() returns (uint) {
    return withdrawableFunds[doctor];
  }

  function withdrawFunds() {
    // Check funds are there
    // Check for overflow
    uint currentFunds = withdrawableFunds[msg.sender];
    withdrawableFunds[msg.sender] = 0;
    msg.sender.transfer(currentFunds); // transfer amount to doctor
  }


  // Fallback function to users to pay to
  function() payable {
    totalRaised += msg.value;

    FundsContributed();
  }

  function checkTotalFundsRaised() constant returns (uint) {
    return totalRaised;
  }

  function registerDoctor(string _name, uint _id) {
    doctor = msg.sender;
    identityOfDoctor[msg.sender].name = _name;
    identityOfDoctor[msg.sender].id = _id;
    identityOfDoctor[msg.sender].idBox = msg.sender;
  }

  function registerVillager(string _name, string _DOB, string _gender) {
    villager = msg.sender;
    identityOfVillager[msg.sender].name = _name;
    identityOfVillager[msg.sender].DOB = _DOB;
    identityOfVillager[msg.sender].gender = _gender;
    identityOfVillager[msg.sender].id = msg.sender;
  }

  function retrieveDoctor() returns (address) {
    return doctor;
  }

  //Retrieve data from the struct
  function getIdentityOfDoctor() returns (string, uint, address) {
    return (identityOfDoctor[doctor].name, identityOfDoctor[doctor].id, identityOfDoctor[doctor].idBox);
  }

  function getVillagerIdentity() returns (string, address, string, string, uint256) {
    return (identityOfVillager[villager].name, identityOfVillager[villager].id, identityOfVillager[villager].gender, identityOfVillager[villager].DOB, identityOfVillager[villager].timeStampOfTreatment);
  }

  //Retrieve data from temporary values, intention to expand this to dynamically sizing arrays
  function getConfirmationOfTreatment() returns (bool) {
    return confirmationOfTreatment[villager];
  }

}
