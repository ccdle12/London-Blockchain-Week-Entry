var HelloWorld = artifacts.require("HelloWorld.sol");
var Identity = artifacts.require("Identity.sol");

var Escrow = artifacts.require("Escrow.sol");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  // deployer.deploy(HelloWorld, "Hello World!");
  // deployer.deploy(Identity);
  deployer.deploy(Escrow, 0);
};
