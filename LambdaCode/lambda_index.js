
var main = require("./main.js");

console.log("Loading Calc Function");

exports.handler = (event, context, callback) => {
    var responseBody = event;
    
    var responseCode = 200;



// creating cookie
/**
* Build a string appropriate for a `Set-Cookie` header.
* @param {string} key     Key-name for the cookie.
* @param {string} value   Value to assign to the cookie.
* @param {object} options Optional parameter that can be use to define additional option for the cookie.
* ```
* {
*     secure: boolean // Watever to output the secure flag. Defaults to true.
*     httpOnly: boolean // Watever to ouput the HttpOnly flag. Defaults to true.
*     domain: string // Domain to which the limit the cookie. Default to not being outputted.
*     path: string // Path to which to limit the cookie. Defaults to '/'
*     expires: UTC string or Date // When this cookie should expire.  Default to not being outputted.
*     maxAge: integer // Max age of the cookie in seconds. For compatibility with IE, this will be converted to a
*          `expires` flag. If both the expires and maxAge flags are set, maxAge will be ignores. Default to not being
*           outputted.
* }
* ```
* @return string
*/




    callback(null, response);
};

console.log("Loading Calc Function");


