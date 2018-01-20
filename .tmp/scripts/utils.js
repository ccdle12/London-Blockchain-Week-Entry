
/**
 * Function to update the UI
 */
function updateUI(docElementId, html, errored) {
    document.getElementById(docElementId).innerHTML = html;

    if (errored) document.getElementById(docElementId).classList = 'not ready';else document.getElementById(docElementId).classList = 'ready';
};

/**
 * Functions that respond to UI activity
 */
function viewSetMessageInContract() {
    var message = document.getElementById('input_text').value;

    setMessageInContract(message);
};

/**
 * Functions that respond to UI activity
 */
function donateFundsView() {
    var donateInput = document.getElementById('donate_input').value;

    donteFundsBackend(donateInput);
};
//# sourceMappingURL=utils.js.map
