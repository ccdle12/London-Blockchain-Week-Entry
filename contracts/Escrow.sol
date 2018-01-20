pragma solidity ^0.4.4;

contract Escrow {

  address facilitator;
  address doctor;

  uint percentDistributed;
  uint totalRaised;

  uint[] arrayOfIds;

  mapping(address => bool) confirmationOfTreatment;

  mapping(address => uint) withdrawableFunds;

  function Escrow(uint _totalRaised) {
    // constructor
    totalRaised = _totalRaised;
  }

  function confirmTreatment() {
    confirmationOfTreatment[msg.sender] = true;

    // release funds to the middleman/doctor
    releaseFunds();
  }

  function releaseFunds() internal {
    totalRaised -= 1; // Should be linked to the contract balance
    withdrawableFunds[doctor] += 1;
    // withdrawableFunds[facilitator] += 1;
  }

  function withdrawFunds(address _addr) {
    // Check funds are there
    // Check for overflow
    uint currentFunds = withdrawableFunds[_addr];
    withdrawableFunds[_addr] = 0;
    msg.sender.transfer(currentFunds); // transfer amount to doctor
  }

  function depositFunds() payable {
    //Make sure there is no overflow, by adding the value and current balance is greater than existing balance;
    totalRaised += msg.value;
  }

  function checkTotalFundsRaised() constant returns (uint) {
    return totalRaised;
  }

  function registerDoctor() {
    doctor = msg.sender;
  }

  function retrieveDoctor() returns (address) {
    return doctor;
  }
}
