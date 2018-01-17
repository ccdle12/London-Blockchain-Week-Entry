pragma solidity ^0.4.4;

contract HelloWorld {
  //Basic storage variable
  string message;
  address lastSent;

  event MessageWritten();

  function HelloWorld(string initMessage) {
    // constructor
    message = initMessage;

    lastSent = msg.sender;
  }

  function getMessage() returns (string) {
    return message;
  }

  function getLastSentAddress() returns (address) {
    return lastSent;
  }

  function setMessage(string passedMessage) {
    message = passedMessage;
    lastSent = msg.sender;

     //Event emitted
    MessageWritten();
  }
}
