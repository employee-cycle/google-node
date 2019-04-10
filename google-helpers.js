// Code is meant to be run step by step in a NodeJS REPL environment

var google = require('googleapis');

// ------------------- Helper functions -------------------

/**
 * Creates an oauth2client out of a cloud console client secret file.
 *
 * @param {string} pathToClientSecret - path to a JSON client secret file
 * @return {google.auth.OAuth2}
 */

// Bug 1: Fixed by Googling {}
var {google} = require('googleapis');

exports.generateOAuth2client = (pathToClientSecret) => {
  var clientSecret = require(pathToClientSecret);

  return new google.auth.OAuth2(
    clientSecret.installed.client_id,
    clientSecret.installed.client_secret,
    'urn:ietf:wg:oauth:2.0:oob'
  );
}

/**
 * Creates an oauth2client out of a cloud console client secret file.
 *
 * @param {google.auth.OAuth2} oauth2client
 */
exports.printCodeURL = (oauth2client) => {
  var scopes = ['https://www.googleapis.com/auth/hire.candidate.readonly'];

  var url = oauth2client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    // If you only need one scope you can pass it as a string
    scope: scopes
  });

  console.log('Follow this url to get an OAuth2 code:\n\n' + url);
}

/**
 * Transforms an OAuth code into OAuth tokens.
 * Note that the code passed is only valid for ~30 seconds.
 *
 * @param {google.auth.OAuth2} oauth2client
 * @param {string} code - OAuth2 code
 */
exports.printTokenFromCode = (oauth2client, code) => {
  oauth2client.getToken(code, function (err, tokens) {
    if (err) {
      console.log('Got error:', err);
    } else {
      console.log('Got tokens:', tokens);
      console.log('Specifically the refresh token is:', tokens.refresh_token);
    }
  });
}

/**
 * Makes a call to the hire API using a refresh token
 *
 * @param {string} pathToDiscoveryDoc - path to the Hire discovery document
 * @param {google.auth.OAuth2} oauth2client
 * @param {string} refreshToken - OAuth2 refresh token
 */
exports.callHireAPI = (pathToDiscoveryDoc, oauth2client, refreshToken) => {
          console.log("above google call");

  console.log(pathToDiscoveryDoc)

  // Bug 2: Fixed by Jason (promises)


  google.discoverAPI(pathToDiscoveryDoc)
  .then((hire) => {

    console.log("inside google");
    oauth2client.setCredentials({
      refresh_token: refreshToken,
    });

    console.log("credentials are set");

    var params = {
      auth: oauth2client,
      parent: 'tenants/my_tenant',
    };

    hire.tenants.candidates.get(params , function (err, result) {
        console.log(err);
        if (err) {
          console.error('Failed to retrieve candidates!');
          throw err;
        }

        console.log('Candidates:', result);
    });
  })
	.catch((error) => {
		console.error('Failed to generate hire client!', error);
	});
}


/**
 * Creates an oauth2client out of a cloud console client secret file.
 *
 * @param {google.auth.OAuth2} oauth2client
 */
exports.printCodeURL = (oauth2client) => {
  var scopes = ['https://www.googleapis.com/auth/hire.candidate.readonly'];

  var url = oauth2client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    // If you only need one scope you can pass it as a string
    scope: scopes
  });

  console.log('Follow this url to get an OAuth2 code:\n\n' + url);
}

//Compressed Helper functions
function generateOAuth2client(pathToClientSecret){var clientSecret=require(pathToClientSecret);return new google.auth.OAuth2(clientSecret.installed.client_id,clientSecret.installed.client_secret,'urn:ietf:wg:oauth:2.0:oob')}function printCodeURL(oauth2client){var scopes=['https://www.googleapis.com/auth/hire.candidate.readonly'];var url=oauth2client.generateAuthUrl({access_type:'offline',scope:scopes});console.log('Follow this url to get an OAuth2 code:\n\n'+url)}function printTokenFromCode(oauth2client,code){oauth2client.getToken(code,function(err,tokens){if(err){console.log('Got error:',err)}else{console.log('Got tokens:',tokens);console.log('Specifically the refresh token is:',tokens.refresh_token)}})}function callHireAPI(pathToDiscoveryDoc,oauth2client,refreshToken){google.discoverAPI(pathToDiscoveryDoc,function(err,hire){if(err){console.error('Failed to generate hire client!');throw err;}oauth2client.setCredentials({refresh_token:refreshToken,});hire.candidates.list({auth:oauth2client},function(err,result){if(err){console.error('Failed to retrieve candidates!');throw err;}console.log('Candidates:',result)})})}
