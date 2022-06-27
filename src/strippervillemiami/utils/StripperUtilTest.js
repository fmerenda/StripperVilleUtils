const logger = require("./LogUtils");
const utils = require("./StripperUtils");

const MiamiAddress = "0xE330C3a9F12eb4D17040FD101e3Ec007A28179F3";
const FranksAddress = "0x8dADB323ec63732d17698bC1C51888f7C84bC848";
const INVALID_INPUT_TO_TRANSFER_ERROR = utils.INVALID_INPUT_TO_TRANSFER_ERROR;
const NOT_ENOUGH_STRIP_IN_ACCT_ERROR = utils.NOT_ENOUGH_STRIP_IN_ACCT_ERROR;
const web3 = utils.web3;


require('dotenv').config();

//**************************************************
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// these are the sending money tings
// CHANGEME: Update your amount here, and be sure
// you have added in your private key in your
// .env file in the base directory of this
// project. There's an example file called
// DOT.env there, you can copy that one to .env
// and update it with your private key
//**************************************************
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const AMOUNT_TO_SEND_TO_EACH_WALLET = 1;
const SENDER_PRIVATE_KEY = process.env.SENDER_PRIVATE_KEY;

 debug = (parameter) => { logger.debug(parameter); };
 log =(parameter) => { logger.log(parameter); };
 info =(parameter) => { logger.info(parameter); };
 warn =(parameter) => { logger.warn(parameter); };
 error =(parameter) => { logger.error(parameter); };
 errorMessageOnly =(parameter) => { logger.errorMessageOnly(parameter); };

// helper function
async function testInvalidInputIntoTransfer(sender, receiver, amount) {
  try {
    await (transferStrip(sender, receiver, amount));
  } catch (err) {
    if (err.message == INVALID_INPUT_TO_TRANSFER_ERROR || err.message == NOT_ENOUGH_STRIP_IN_ACCT_ERROR) {
      // all is OK
      debug("Invalid input caught successfully in test. :" + err.message);
      return;

    }
    else {
      debug("The transaction threw an error on invalid input for an address. I hope:");
      debug(err.message);
      return;
    }
  }
  error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  error("!!!!!!!!!!! YOUR TEST FAILED! Did not catch incorrect input!!!!!!!!!!");
  error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}



//********************************************************************
//********************************************************************
//************** Test functions **************************************
//********************************************************************
//********************************************************************

// Check inputs into your method calls
async function testRunInvalidInputTests() {
  debug("Testing invalid input started");
  testInvalidInputIntoTransfer();
  testInvalidInputIntoTransfer();
  testInvalidInputIntoTransfer("a");
  testInvalidInputIntoTransfer("a", "a");
  testInvalidInputIntoTransfer("a", "a", "1");
  debug("Testing invalid input completed");

  // check balances
  debug("testing balance levels before call");
  let miamiBalance = await (utils.getStripCoinBalance(MiamiAddress));
  await (testInvalidInputIntoTransfer(MiamiAddress, FranksAddress, miamiBalance + 2 * 10 * 18));

  debug("Testing invalid input completed successfully");

}

//*********** transfer test  ***********************
async function runTestTransfer() {
  debug("in runTestTransfer");

  // This is an actual real transfer
  // 18 point accuracy
  let receiverBalanceBefore = await (utils.getStripCoinBalance(FranksAddress));
  let senderBalanceBefore = await (utils.getStripCoinBalance(MiamiAddress));
  let myTransfer = await (utils.transferStrip(MiamiAddress, FranksAddress, 1));
  let receiverBalanceAfter = await (utils.getStripCoinBalance(FranksAddress));
  let senderBalanceAfter = await (utils.getStripCoinBalance(MiamiAddress));

  // assuming the transfer worked because no errors
  let gains = receiverBalanceAfter - receiverBalanceBefore;
  let diff = senderBalanceBefore - (senderBalanceAfter + gains);
  if (diff > web3.utils.toWei("1")) {
    error("!!!!!!!!!!!! Your balances were not correct after the transfer!");
    debug(gains + "," + receiverBalanceBefore + "," + receiverBalanceAfter + "," +
      senderBalanceBefore + "," + senderBalanceAfter);
    error("Note that it may be OK, decimal places may not match");
  } else {
    debug("Test runTestTransfer ran correctly");
  }

}

// ** get owner by stripper id
async function testGetOwnerByStripperID() {

  let theOwner = await (utils.getOwnerByStripperID('1640'));
  debug("The owner is " + theOwner);

  if (theOwner != '0x8dADB323ec63732d17698bC1C51888f7C84bC848') {
    error('testGetOwnerByStripperID failed! Should be '
      + '0x8dADB323ec63732d17698bC1C51888f7C84bC848. unless '
      + 'Frank sold stripper #1640');
  } else {
    debug('testGetOwnerByStripperID passed');
  }
}


//**************************************************
// testGetStripBalance
//**************************************************
async function testGetStripBalance() {
  debug('running testGetStripBalance()');

  let asdf = await (utils.getStripCoinBalance(FranksAddress));
  log("balance for address " + FranksAddress + " = " + asdf);
}

//**************************************************
// testGetLatestBlockNumber();
//**************************************************
async function testGetLatestBlockNumber() {
  log("running testGetLatestBlockNumber()");

  let myBlockNumber = await (utils.getBlockNumber());
  log("latest block number is " + myBlockNumber);
}

//**************************************************
//**************************************************
// ******** Run all the tests **********************
//**************************************************
//**************************************************
                                         
/*************************************************
 ** quick test to check install
 *************************************************/

async function runQuickTests() {
  log("started running quick tests");
  await (testGetStripBalance());
  await (testGetLatestBlockNumber());
  await (testRunInvalidInputTests());
  log("Done running quick tests");
}
/**************************************************
 ** Function runAllTests
 ** Make sure everything is
 ** working correctly.
 **
 ** THIS WILL SEND ONE ACTUAL STRIP COIN FROM THE
 ** ACCOUNT THAT OWNS THE PRIVATE KEY TO
 ** FRANK'S ACCOUNT UNLESS CHANGED BEFORE RUNNING!
 **************************************************/

async function runAllTests() {
  Log("started running all StripperUtilTest tests");
  await (testGetStripBalance());
  await (testGetLatestBlockNumber());
  await (testRunInvalidInputTests());
  await (runTestTransfer());
  await( testGetOwnerByStripperID());
  log("Running test distribute strip tests ");
  Log("done running all StripperUtilTest tests");
  log("Tests completed!");

}

// run tests here
runQuickTests();
//runAllTests();