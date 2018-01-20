/**
 * ABI and contract
 * 
 */
var contract_abidefinition = [{ "constant": false, "inputs": [{ "name": "_name", "type": "string" }, { "name": "_DOB", "type": "string" }, { "name": "_gender", "type": "string" }], "name": "registerVillager", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }, { "name": "_id", "type": "uint256" }], "name": "registerDoctor", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawFunds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "confirmTreatment", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "retrieveDoctorsAvailableFunds", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "checkAvailableReleasedFunds", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getVillagerIdentity", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "address" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "retrieveDoctor", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "checkTotalFundsRaised", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "getIdentityOfDoctor", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getConfirmationOfTreatment", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_totalRaised", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [], "name": "FundsContributed", "type": "event" }, { "anonymous": false, "inputs": [], "name": "FundsReleased", "type": "event" }];

var contract_address = '0xf1d316512ec5d70d350548a39fa38dd772215469';
var contract;

/**
 * Web page load listener
 */
window.addEventListener('load', function () {

    //Web3 instance from testrpc
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

        //Testing if we can update the UI
        updateUI('connect_status', 'Connected', false);
    }

    getNodeVersion();
    retrieveDeployedContract();

    getTotalFundsRaised();
    getDoctorIdentity();
    getDoctorsAvailableFunds();
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
    watchForFundsReleased();
}

function getTotalFundsRaised() {
    contract.checkTotalFundsRaised.call(function (error, result) {
        if (error) {
            console.log("There was an error");
            console.log(error);
            updateUI('total_funds', "Can't access the blockchain");
        } else {
            updateUI('total_funds', result);
        }
    });
}

//Internal Function
function viewRegisterVillager() {
    contract.registerVillager("Charlize Smith", "24/04/1995", "Female", { gas: 4032432 }, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            console.log("Result successful:");
            console.log(result);
            viewGetVillagerIdentity();
        }
    });

    contract.getConfirmationOfTreatment.call(function (error, result) {
        if (error) {
            console.log(error);
        } else {
            console.log("Result successful:");
            console.log(result);
            updateUI('villager_confirmation_of_treatment', result);
        }
    });
}

function viewRegisterDoctor() {
    contract.registerDoctor("Dr Moresby", 4, { gas: 4032432 }, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            console.log("Result successful:");
            console.log(result);
            getDoctorIdentity();
        }
    });
}

function getDoctorIdentity() {
    console.log("GET DOCTOR IDENTITY CALLED!!!");
    contract.getIdentityOfDoctor.call(function (error, result) {
        if (error) {
            updateUI('doctor_identity_name', "Can't access the blockchain");
        } else {
            console.log(result);
            updateUI('doctor_identity_name', result[0]);
            updateUI('doctor_identity_id', result[1]);
            updateUI('doctor_identity_id_box', result[2]);
        }
    });
}

/**
 * Retrieve villager state
 */
function viewGetVillagerIdentity() {
    contract.getVillagerIdentity.call(function (error, result) {
        if (error) {
            updateUI('villager_identity_name', "Can't access the blockchain");
        } else {
            console.log(result);
            updateUI('villager_identity_name', result[0]);
            updateUI('villager_identity_id', result[1]);
            updateUI('villager_identity_gender', result[2]);
            updateUI('villager_identity_DOB', result[3]);

            if (result[4] != 0) updateUI('villager_time_of_treatment', result[4]);else updateUI("villager_time_of_treatment", "Villager has not been treated");
        }
    });
}

function getVillagerIdentity() {
    console.log("GET DOCTOR IDENTITY CALLED!!!");
    contract.getVillagerIdentity.call(function (error, result) {
        if (error) {
            updateUI('doctor_identity_name', "Can't access the blockchain");
        } else {
            console.log(result);
            updateUI('villager_identity_name', result[0]);
            updateUI('villager_identity_id', result[1]);
            updateUI('villager_identity_gender', result[2]);
            updateUI('villager_identity_DOB', result[2]);
        }
    });
}

function getVillagerTreatmentState() {
    contract.getConfirmationOfTreatment.call(function (error, result) {
        if (error) {
            updateUI('villager_confirmation_of_treatment', "Can't access the blockchain");
        } else {
            updateUI('villager_confirmation_of_treatment', result);
        }
    });
}

function getDoctorsAvailableFunds() {
    console.log("GET DOCTOR FUNDS AVAILABLE");

    contract.checkAvailableReleasedFunds.call(function (error, result) {
        if (error) {
            updateUI('doctor_identity_name', "Can't access the blockchain");
        } else {
            console.log("FUNDS RELEASED UPDATED");
            console.log(result);
            updateUI('doctor_available_funds', result);
        }
    });
}

function donteFundsBackend(donateInput) {
    console.log("Donating funds: ");
    console.log(parseInt(donateInput));

    web3.eth.sendTransaction({ to: contract_address, value: donateInput });
}

function confirmTreatment() {
    contract.confirmTreatment(function (error, result) {
        if (error) {
            console.log("There was an error");
        } else {
            var latestBlock = web3.eth.getBlock('latest');

            var blockFromContract = web3.eth.getTransaction(result);
            var blockNumber = blockFromContract.blockNumber;
            var block = web3.eth.getBlock(blockNumber);
            var timestamp = block.timestamp;
            var date = new Date(timestamp * 1000);

            updateUI('villager_time_of_treatment', date.toString());
            console.log(date);
        }
    });
}

/**
 * Monitoring events from the contract
 */
function watchForEvent() {

    // Watch for Funds Contributed Events
    contract.FundsContributed({ target: "FundsContributed" }, { fromBlock: 0, toBlock: 'latest' }).watch(function (error, result) {
        if (error) console.log("error");else {
            console.log("events fired");
            console.log("FUND CONTRIBUTED SEEN!");

            getTotalFundsRaised();
        }
    });
}

function watchForFundsReleased() {
    // Watch for Funds Released Events;
    contract.FundsReleased({ target: "FundsReleased" }, { fromBlock: 0, toBlock: 'latest' }).watch(function (error, result) {
        if (error) console.log("error");else {
            console.log("events fired");
            console.log("FUND CONTRIBUTED SEEN!");

            getTotalFundsRaised();
            getDoctorsAvailableFunds();
        }
    });
}

// function watchForVillagerConfirmation() {
//     contract.VillagerConfirmationTimeStamp({target: "FundsReleased"}, {fromBlock: 0, toBlock: 'latest'}).watch(function(error, result) {

//     })
// }
//# sourceMappingURL=main.js.map
