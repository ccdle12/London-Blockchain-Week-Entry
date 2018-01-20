var Escrow = artifacts.require("Escrow.sol");

contract('Escrow', function(accounts) {

  it("should assert true", function(done) {
    var escrow = Escrow.deployed();
    assert.isTrue(true);
    done();
  });

  it("Total raised should be 0", function() {
    var contract;
    return Escrow.deployed().then(function(instance) {
      contract = instance;

      return contract.checkTotalFundsRaised.call();
    }).then(function(result) {
      assert.equal(result, 0, "Total funds raised should be 0");
    })
  });

  it("Total raised should increase the total raised", function() {
    var contract;
    var donor = accounts[1];

    return Escrow.deployed().then(function(instance) {
      contract = instance;
      var amount = web3.toWei(1);

      return contract.depositFunds({from: donor, value: amount });
    }).then(function(result) {
      return contract.checkTotalFundsRaised.call();
    }).then(function(result) {
      assert.equal(web3.fromWei(result.toNumber()), 1, "Total funds raised should be 5");
    })
  });

  it("Villager confirms that they are treated and funds released", function() {
    var contract;
    var donor = accounts[1];
    var villager1 = accounts[2];
    var doctor = accounts[3];

    return Escrow.deployed().then(function(instance) {
      contract = instance;
      var amount = web3.toWei(1);

      return contract.depositFunds({from: donor, value: amount });
    }).then(function(result) {
      return contract.checkTotalFundsRaised.call();
    }).then(function(result) {
      assert.equal(web3.fromWei(result.toNumber()), 2, "Total funds raised should be 5");

      return contract.registerDoctor({from: doctor});
    }).then(function(result) {
      return contract.retrieveDoctor.call();
    }).then(function(result) {
      assert.equal(result, doctor, "The doctor has the same address");
    }).then(function(result) {
      return contract.confirmTreatment({from: villager1});
    }).then(function(result) {
      
    })

  });

  // it("should assert true", function(done) {

  //   var villager1StartingBalance = startingBalance = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether');
  //   var doctorStartingBalance = web3.fromWei(web3.eth.getBalance(accounts[2]), 'ether');
  //   var villager1 = accounts[1];
  //   var doctor = accounts[2];
  //   var donor = accounts[3];
  //   var contract;

  //   return Escrow.deployed().then(function(instance) {
  //     contract = instance;
  //     var amount = web3.toWei(5);

  //     assert.equal(amount, web3.toWei(5), "Should be the same amount");
  //     // return contract.depositFunds.sendTransaction({from: donor, value: amount});
  //   })
    
    // .then(function(result) {

    //   return balance = web3.fromWei(web3.eth.getBalance(accounts[0]), 'ether');
    // }).then(function(result) {
    //   assert.equal(balance.toNumber().toPrecision(1), web3.toWei(5), "Total raised from should be 5");
    // })
  });
// });
