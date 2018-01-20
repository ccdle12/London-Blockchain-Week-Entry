var Identity = artifacts.require("Identity.sol");

// contract('Identity', function(accounts) {

//   it("should create and return an identity", function(done) {
//     var contract;
//     return Identity.deployed().then(function(instance){
//       contract = instance;

//       return contract.createIdentity.sendTransaction(1, "Villager 1", 010170, accounts[1], {from: accounts[0]});
//     }).then(function(result) {
//       return contract.getAddress.call(1);
//     }).then(function(result) {
//       assert.equal(result, accounts[1], "Assert that the address is accounts[1]");
//     }) 
//   });


// });
