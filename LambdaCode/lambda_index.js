
var main = require("./main.js");

console.log("Loading Calc Function");

exports.handler = (event, context, callback) => {
    var responseBody = event;
    
    var responseCode = 200;
   // var mainResp = main.CreatePayload();
   
   // the below method would return list of cookie in request header
   /**
* Receives an array of headers and extract the value from the cookie header
* @param  {String}   errors List of errors
* @return {Object}
*/
function getCookiesFromHeader(headers) {

    if (headers === null || headers === undefined || headers.Cookie === undefined) {
        return {};
    }

    // Split a cookie string in an array (Originally found http://stackoverflow.com/a/3409200/1427439)
    var list = {},
        rc = headers.Cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        var key = parts.shift().trim()
        var value = decodeURI(parts.join('='));
        if (key != '') {
            list[key] = value
        }
    });

    return list;
};


var headerCookies = getCookiesFromHeader(event.headers);


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
function setCookieString(key, value, options) {
    var defaults = {
        secure: true,
        httpOnly: true,
        domain: false,
        path: '/',
        expires: false,
        maxAge: false
    }
    if (typeof options == 'object') {
        options = Object.assign({}, defaults, options);
    } else {
        options = defaults;
    }

    var cookie = key + '=' + value;

    if (options.domain) {
        cookie = cookie + '; domain=' + options.domain;
    }

    if (options.path) {
        cookie = cookie + '; path=' + options.path;
    }

    if (!options.expires && options.maxAge) {
        options.expires = new Date(new Date().getTime() + parseInt(options.maxAge) * 1000); // JS operate in Milli-seconds
    }

    if (typeof options.expires == "object" && typeof options.expires.toUTCString) {
        options.expires = options.expires.toUTCString();
    }

    if (options.expires) {
        cookie = cookie + '; expires=' + options.expires.toString();
   }

    if (options.secure) {
        cookie = cookie + '; Secure';
    }

    if (options.httpOnly) {
        cookie = cookie + '; HttpOnly';
    }

    return cookie;
}

var amcv_Cookie;

   
   //check if cookie exists else create one
   if(!headerCookies['AMCV_@AdobeOrg']){
       // logic to create a cookie
       amcv_Cookie = setCookieString('AMCV_@AdobeOrg','MCMID-2167743609|1234|MCAAMB|abcd1234|MCAAMLH|9');
       console.log('amcv cookie created in code', amcv_Cookie);
   } else {
       amcv_Cookie = headerCookies['AMCV_@AdobeOrg'];
       console.log('cookie was available in Request Headers', headerCookies['AMCV_@AdobeOrg']);
   }
   
    
    
   
     var mainResp = main.CreatePayload(amcv_Cookie,"mock-test-int");
     console.error("test1:"+mainResp);
     
     
     
     
    //setting cookie
    
     console.log("{'Cookie':event['Cookie']}");
    var date = new Date();

  // Get Unix milliseconds at current time plus 365 days
  date.setTime( 1332403882588); 
  var cookieVal = Math.random().toString(36).substring(7); // Generate a random cookie string
  
  var cookieString = "myCookie="+cookieVal+"; domain=my.domain; expires="+date.toGMTString()+";";
  console.log("{'Cookie':event['Cookie']}"+cookieString);
  
  
  
    
    var response = {
        statusCode: responseCode,
        headers: {
            "x-custom-header" : "cookie test",
            "cookie" : "custom cookie"
            
        },
        
        body: JSON.stringify(mainResp)
    };

    console.log("Got this cookie:", event.cookie);
    console.log("response: " + JSON.stringify(response));
    callback(null, response);
};

console.log("Loading Calc Function");


