"use strict";

/**
 * ABI and contract
 * 
 */
var contract_abidefinition = [{ "constant": false, "inputs": [{ "name": "passedMessage", "type": "string" }], "name": "setMessage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getMessage", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getLastSentAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "initMessage", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [], "name": "MessageWritten", "type": "event" }];

var contract_address = '0xce7b614c490374eb56168bbd1904fa07b2d85c18';
var contract;

/**
 * Web page load listener
 */
window.addEventListener('load', function () {
    /***
     * Commented out the below code because currently watching events seems to only work from using the web3 instance from the private chain
     * 
     */

    //Is web3 injected by meta mask?
    // if (typeof web3 !== 'undefined') {
    //     //Use web3 provided by metamask
    //     window.web3 = new Web3(web3.currentProvider);
    //     console.log("Web 3 provided by metamask");
    // } else {
    //     console.log("Web 3 NOT injected by metamask");

    //     //Use web3 from local node
    //     //Only if a geth or testrpc node is running?
    //     //CURRENTLY ONLY WORKS WITH METAMASK
    //     window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    // }


    //Web3 instance from the private geth console
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

    startApp();
});

/**
 * Function that kicks off the app
 */
function startApp() {

    if (web3 && web3.isConnected()) {
        //Testing if we can log print
        console.log("Web 3 is connected");

        //Testing if we can use utils.js
        callMe();

        //Testing if we can update the UI
        updateUI('connect_status', 'Connected', false);
    }

    getNodeVersion();
    retrieveDeployedContract();
    getMessageFromContract(contract);
    getLastSentAddress();
}

/**
 * Function to understand web3 api
 */

function getNodeVersion() {
    web3.version.getNode(function (error, result) {
        if (error) console.log("There was an error: " + error);else {
            console.log("There was a result: " + result);
        }
    });
}

/**
 * Functions to interact with deployed contract
 */
function retrieveDeployedContract() {
    // Retrieved the contract from the local geth node
    contract = web3.eth.contract(contract_abidefinition).at(contract_address);
    watchForEvent();
}

function getMessageFromContract(contract) {
    console.log("Getting message from contract");
    contract.getMessage.call(function (error, result) {
        if (error) {
            console.log("There was an error");
            updateUI('message_set', error, true);
        } else {
            updateUI('message_set', result, false);
            console.log("Updated UI message successfully");
            console.log(result);

            getLastSentAddress();
        }
    });
}

function setMessageInContract(message) {
    console.log(contract);
    contract.setMessage(message, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            console.log('Now printing the reuslt');
            console.log(result);
        }
    });
}

function getLastSentAddress() {
    console.log("Calling get last sent address");
    contract.getLastSentAddress.call(function (error, result) {
        if (error) {
            console.log("There was an error");
            updateUI('last_address', "No address set", false);
        } else {
            updateUI('last_address', result, false);
        }
    });
}

/**
 * Filters for monitoring change in deployed contract state
 */
function watchForEvent() {
    contract.MessageWritten({ target: "MessageWritten" }, { fromBlock: 0, toBlock: 'latest' }).watch(function (error, result) {
        if (error) console.log("error");else {
            console.log("events fired");
            getMessageFromContract(contract);
        }
    });
}
//# sourceMappingURL=main.js.map
