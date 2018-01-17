var HelloWorld = artifacts.require("HelloWorld.sol");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(HelloWorld, "Hello World!");
};
