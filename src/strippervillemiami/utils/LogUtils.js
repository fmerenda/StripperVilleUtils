/**
 * helper logging stuff so I can shut it off via this file.
 * hack, I know but so what. 
 * 
 * to use:
 * 
 * in your file:
 * 
    // import the helper script
    const logme = require("./LogUtils");
    
    // make my own helper functions to make usage easier
    const log = (parameter) => { logme.log(parameter);};
    const debug = (parameter) => { logme.debug(parameter);};
    const warn = (parameter) => { logme.warn(parameter);};
    const error = (parameter) => { logme.error(parameter);};
 * 
 * Author: Frank Merenda, blah blah blah blah blah.
 * License: GPL3
 */




var DEBUG = false;
var LOG = true;
var WARN = true;
var ERROR = true;


function debug(data) {
    if (DEBUG) {
        console.debug("DEBUG: " + data);
    }
}

function log(data) {
    if (LOG) {
        console.log("LOG: " + data);
    }
}
function warn(data) {
    if (WARN) {
       console.warn("WARN: " + data);
    }
}
function error(data) {
    if (ERROR) {
        console.error("ERROR: " + data);
    }
}

function errorMessageOnly(myError) {
    if (ERROR) {
        console.error("ERROR_MESSAGE: " +myError.message);
    }
}


module.exports = { debug, log, warn, error, errorMessageOnly };