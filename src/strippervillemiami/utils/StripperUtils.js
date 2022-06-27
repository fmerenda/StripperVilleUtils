/***************************************************
 * StripperVilleUtils.js
 * A bunch of stuff to do stuff, and stuff.
 * 
 * !! See the README.txt file to set up
 * !! the project to run locally.
 * 
 * This file is heavily documented to assist
 * anyone who is just learning blockchain programming.
 ***************************************************/

// this will read in a .env file and make it available for
// you. there's an example file in the base dir of this
// project.
require('dotenv').config();

//**************************************************
// these are the sending money things
// CHANGEME: Update your amount here, and be sure
// you have added in your private key in your
// .env file in the base directory of this
// project. There's an example file called
// DOT.env there, you can copy that one to .env
// and update it with your private key
//**************************************************
const SENDER_PRIVATE_KEY = process.env.SENDER_PRIVATE_KEY;
const SENDER_WALLET_ADDRESS = "0xE330C3a9F12eb4D17040FD101e3Ec007A28179F3"; 
const AMOUNT_TO_SEND_TO_EACH_WALLET = 1;

/******************************************************
 * Setup all (most) of the varaibles that you'll need *
 ******************************************************/
const logme = require("./LogUtils");

const Web3 = require("web3");
const web3 = new Web3("https://node.stripchain.blockwell.ai");
exports.web3 = web3;
const StripTokenAddress = "0xB00B1E26e608Dce631db71c556bA1cf378aFFbEb";
// stripper NFTs
const SPV_ADDRESS = "0xB00B1Ec5c407C6b1F7d70F08F809f1a81Eb1DBBd";


const INVALID_INPUT_TO_TRANSFER_ERROR = "Invalid input into transfer strip!!!!!!";
exports.INVALID_INPUT_TO_TRANSFER_ERROR = INVALID_INPUT_TO_TRANSFER_ERROR;
const NOT_ENOUGH_STRIP_IN_ACCT_ERROR = "Not enough $STRIP in the account to send out. Aborting.";
exports.NOT_ENOUGH_STRIP_IN_ACCT_ERROR = NOT_ENOUGH_STRIP_IN_ACCT_ERROR;


// standard ECR20 ABI for stripcoin
const ECR20ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newAdmin", "type": "address" }], "name": "changeExecutionAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "owner", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "burnFor", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "approveFor", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }, { "name": "amountNeeded", "type": "uint256" }], "name": "addAllowanceIfNeeded", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "who", "type": "address" }], "name": "isExecutionOperator", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "who", "type": "address" }], "name": "isSuperOperator", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "executionOperator", "type": "address" }, { "name": "enabled", "type": "bool" }], "name": "setExecutionOperator", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "gasLimit", "type": "uint256" }, { "name": "data", "type": "bytes" }], "name": "approveAndExecuteWithSpecificGas", "outputs": [{ "name": "success", "type": "bool" }, { "name": "returnData", "type": "bytes" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newAdmin", "type": "address" }], "name": "changeAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "superOperator", "type": "address" }, { "name": "enabled", "type": "bool" }], "name": "setSuperOperator", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getExecutionAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "target", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "data", "type": "bytes" }], "name": "paidCall", "outputs": [{ "name": "", "type": "bytes" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "target", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "data", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "", "type": "bytes" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "gasLimit", "type": "uint256" }, { "name": "tokenGasPrice", "type": "uint256" }, { "name": "baseGasCharge", "type": "uint256" }, { "name": "tokenReceiver", "type": "address" }, { "name": "data", "type": "bytes" }], "name": "approveAndExecuteWithSpecificGasAndChargeForIt", "outputs": [{ "name": "success", "type": "bool" }, { "name": "returnData", "type": "bytes" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "gasLimit", "type": "uint256" }, { "name": "data", "type": "bytes" }], "name": "executeWithSpecificGas", "outputs": [{ "name": "success", "type": "bool" }, { "name": "returnData", "type": "bytes" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "gasLimit", "type": "uint256" }, { "name": "tokenGasPrice", "type": "uint256" }, { "name": "baseGasCharge", "type": "uint256" }, { "name": "tokenReceiver", "type": "address" }], "name": "transferAndChargeForGas", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "sandAdmin", "type": "address" }, { "name": "executionAdmin", "type": "address" }, { "name": "beneficiary", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "superOperator", "type": "address" }, { "indexed": false, "name": "enabled", "type": "bool" }], "name": "SuperOperator", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldAdmin", "type": "address" }, { "indexed": false, "name": "newAdmin", "type": "address" }], "name": "AdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldAdmin", "type": "address" }, { "indexed": false, "name": "newAdmin", "type": "address" }], "name": "ExecutionAdminAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "executionOperator", "type": "address" }, { "indexed": false, "name": "enabled", "type": "bool" }], "name": "ExecutionOperator", "type": "event" }]

const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

//**************************************************
// ** just some logging utils here
//**************************************************
const log = (parameter) => { logme.log(parameter); };
const debug = (parameter) => { logme.debug(parameter); };
const warn = (parameter) => { logme.warn(parameter); };
const error = (parameter) => { logme.error(parameter); };
const errorMessageOnly = (parameter) => { logme.errorMessageOnly(parameter); };


// -----------------------------------------------------------------------
// ------ Functions -----
// -----------------------------------------------------------------------
function sleep(milliseconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({})
    }, milliseconds);
  })
}

/**************************************************
 ** Function  getBlockNumber() 
 **************************************************/
async function getBlockNumber() {
  const latestBlockNumber = await (web3.eth.getBlockNumber());
  log("latest block in function getBlockNumber : " + latestBlockNumber);
  return latestBlockNumber;
}
exports.getBlockNumber = getBlockNumber;


/*********************************************************
 * function to get the STRIP balance for an address
 ********************************************************
*/
async function getStripCoinBalance(address) {

  let myStripToken = await (new web3.eth.Contract(ERC20TransferABI, StripTokenAddress));
  debug('in getStripCoinBalance(). Address is ' + address);

  let myBalance = await (myStripToken.methods.balanceOf(address).call(function (err, res) {
    if (err) {
      error("An error occured", err);
      return;
    }//if(err)
  }// let

  ))//call//await
  return myBalance;
}
exports.getStripCoinBalance = getStripCoinBalance;


/**************************************************
 ** Function transferStrip
 ** to transfer strip, duh
 **************************************************/
async function transferStrip(sender, receiver, amount) {

  try {
    // check inputs
    debug("debug: sender is " + sender + " receiver is " + receiver + " amount is " + amount);
    log("log: sender is " + sender + " receiver is " + receiver + " amount is " + amount);

    if (sender == undefined || receiver == undefined
      || amount == undefined || (!typeof amount == "number" || !typeof amount == "string")) {
      throw Error(INVALID_INPUT_TO_TRANSFER_ERROR);
    }
  }
  catch (err) {
    errorMessageOnly(err);
    throw Error(INVALID_INPUT_TO_TRANSFER_ERROR);
  }

  let amountToSendInWei = web3.utils.toBN(amount);
  amountToSendInWei = web3.utils.toWei(amountToSendInWei);

  // get balance of sender
  let senderBalance = await (getStripCoinBalance(sender));
  debug("balance going in for sender is: " + senderBalance);

  let reciepentBalanceBefore = await (getStripCoinBalance(receiver));
  debug("balance going in for reciever before is:" + reciepentBalanceBefore);

  // check balance of sender to make sure there's enough
  if (amountToSendInWei > senderBalance) {
    throw Error(NOT_ENOUGH_STRIP_IN_ACCT_ERROR);
  }

  // create transaction
  let myWallet = web3.eth.accounts.wallet
  web3.eth.accounts.wallet.add(SENDER_PRIVATE_KEY);


  let myStripToken = await (new web3.eth.Contract(ECR20ABI, StripTokenAddress));
  data = myStripToken.methods.transfer(receiver, amountToSendInWei).encodeABI();

  const nonce = await web3.eth.getTransactionCount(sender, 'latest');
  const gasprice = await web3.eth.getGasPrice();
  var gas = 21572 * 50;// ?

  const transaction = {
    'to': StripTokenAddress,
    'value': 0,
    'gas': gas,
    'nonce': nonce,
    'data': data
  };

  const signedTx = await web3.eth.accounts.signTransaction(transaction, SENDER_PRIVATE_KEY);

  let reciepentBalanceAfter = null;

  await (web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
      if (!error) {
        log("running sendSignedTransaction");
        //check everything after
        let transactionReceipt = null;
        while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
          transactionReceipt = web3.eth.getTransactionReceipt(hash);
          sleep(500);
        }

        debug("Got the transaction receipt: ", transactionReceipt);

      } else {
        error("❗Something went wrong while submitting your transaction:", error);
        throw error;
      }
try {
  reciepentBalanceAfter = getStripCoinBalance(receiver);
  reciepentBalanceAfter.then(function(){
    isResolved = true;
  });
  debug("1"+typeof reciepentBalanceAfter);
  debug("2"+String(typeof reciepentBalanceAfter) == 'object Promise')
  while (reciepentBalanceAfter == undefined || typeof(reciepentBalanceAfter) == 'object Promise'){
    sleep(200);
    debug('sleeping');
  }

} catch (error) {
  errorMessageOnly(error);
}


    })
  );

  debug(reciepentBalanceAfter);
  await(reciepentBalanceAfter);
  
  log('Ending balance is:'+ reciepentBalanceAfter);
}
exports.transferStrip = transferStrip;

//*****************************************************************************
// ************** Example method calls ****************************************
//*****************************************************************************
// !!!!! NEVER call these fuctions from here! This is just for a reference!!!!!
// !!!!! NEVER call these fuctions from here! This is just for a reference!!!!!
// !!!!! NEVER call these fuctions from here! This is just for a reference!!!!!
// call from the MAIN method, or to put at the bottom of the file.
// reference function for usage in other places
//*****************************************************************************
//*****************************************************************************
async function exampleFunctionCallsForReference() {

  // !!!!! NEVER call these fuctions from here! This is just for a reference!!!!!
  // !!!!! NEVER call these fuctions from here! This is just for a reference!!!!!
  // !!!!! NEVER call these fuctions from here! This is just for a reference!!!!!
  // call from the MAIN method, or to put at the bottom of the file.
  while (false) {

    //**************************************************
    // ** these functions need to be called from an async
    // ** function unless you want to spawn threads.
    // ** Hint: You probably don't for this utility!
    // ** Look at StripperUtilTest.js for examples!
    // **
    // i.e.
    /*
    async function test() {
      let bal = await(getStripBalanceWrapper());
    }
    */

    // see the test*() methods for examples.

    // to get the latest block number
    let q = await (getBlockNumber());

    // get strip balance for an address
    let bal = await (getStripCoinBalance(FranksAddress));
  }
}



//*****************************************************************************
// ************** Here's where you put your code ******************************
//***************  to actually do stuff          ******************************
//*****************************************************************************

/*****************************************************
 * 
 * @param {int} stripperID 
 * @returns owner's wallet address (0xXXXXXXXXXXXXXXX)
 */
async function getOwnerByStripperID(stripperID) {
  debug("in getOwnerByStripperID:"+ stripperID);

  // ganked from the old ABI on the etheriuim chain.
  const SPVABI = [{
    "type": "function", "stateMutability": "view",
    "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "ownerOf",
    "inputs": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256" }]
  }];


  const spvContract = new web3.eth.Contract(SPVABI, SPV_ADDRESS);
  let theOwner = await(spvContract.methods.ownerOf(stripperID).call(function (err, res) {
    if (err) {
      error("An error occured", err);
      return;
    } //if(err)
  } // let
  )); //call/await
  debug("we have an owner:" + theOwner)
  return theOwner;
}
exports.getOwnerByStripperID = getOwnerByStripperID;


//////////////////////////////////////////////////
////////////// Main     /////////////////////////
/////////////////////////////////////////////////
//testGetOwnerByStripperID();
//getOwnerList();

async function runDistribution() {
  let a = require('./StripperIds');
  let stripperIdsToSendTo = a.stripperIDsToSendTo;
  debug(stripperIdsToSendTo);

  let senderBalanceBefore = await (getStripCoinBalance(SENDER_WALLET_ADDRESS));
  log("Supplier balance before is " + senderBalanceBefore)
  for (let i = 0; i <   stripperIdsToSendTo.length; i++){
    let stripperToLookUp = stripperIdsToSendTo[i];
    debug(stripperToLookUp);
    // getting strange reference errors if I don't assign this variable for some reason.
    let StripperIDTemp = stripperToLookUp;
    
    let theOwner = await(getOwnerByStripperID(stripperToLookUp));
    debug("must send to wallet " + theOwner + " for stripper " + StripperIDTemp);

    // finally send the $STRIP
    let myTransfer = await (transferStrip(SENDER_WALLET_ADDRESS, theOwner, AMOUNT_TO_SEND_TO_EACH_WALLET));
  }

  let senderBalanceAfter = await (getStripCoinBalance(SENDER_WALLET_ADDRESS));
  log("Supplier balance after is " + senderBalanceAfter);
}


/////////////////////////////////////////////////////
///**************************************************
///*** Do stuff below here!!     ********************
///**************************************************
/////////////////////////////////////////////////////
//runDistribution();
