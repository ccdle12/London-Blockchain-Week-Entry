
/**
 * Test function to see if it can be called by main.js
 */
function callMe() {
  console.log("I am being called from utils.js");
};

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
//# sourceMappingURL=utils.js.map
