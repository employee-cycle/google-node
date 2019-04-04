// Code is meant to be run step by step in a NodeJS REPL environment

var google = require('googleapis');

var pathToClientSecret = 'client_secrets.json';
var pathToDiscoveryDoc = 'config/discoveryDoc.json';


// Step 1: Generate an oauth2client
var oauth2client = generateOAuth2client(pathToClientSecret);

// Step 2: Get OAuth2 code (valid ~30 seconds)
printCodeURL(oauth2client);

// Step 3: Transform Oauth2 code into Oauth2 refresh token (long lived)
printTokenFromCode(oauth2client, 'CODE FROM PREVIOUS STEP');

// Step 4: use refresh token to make calls to the Hire API
callHireAPI(pathToDiscoveryDoc, oauth2client, 'REFRESH TOKEN FROM PREVIOUS STEP');


// ------------------- Helper functions -------------------

/**
 * Creates an oauth2client out of a cloud console client secret file.
 *
 * @param {string} pathToClientSecret - path to a JSON client secret file
 * @return {google.auth.OAuth2}
 */
function generateOAuth2client(pathToClientSecret) {
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
function printCodeURL(oauth2client) {
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
function printTokenFromCode(oauth2client, code) {
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
function callHireAPI(pathToDiscoveryDoc, oauth2client, refreshToken) {
  google.discoverAPI(pathToDiscoveryDoc, function (err, hire) {
    if (err) {
      console.error('Failed to generate hire client!');
      throw err;
    }

    oauth2client.setCredentials({
      refresh_token: refreshToken,
    });

    var params = {
      auth: oauth2client,
      parent: 'tenants/my_tenant',
    };

    hire.tenants.candidates.list(params , function (err, result) {
        if (err) {
          console.error('Failed to retrieve candidates!');
          throw err;
        }

        console.log('Candidates:', result);
    });
  });
}

//Compressed Helper functions
function generateOAuth2client(pathToClientSecret){var clientSecret=require(pathToClientSecret);return new google.auth.OAuth2(clientSecret.installed.client_id,clientSecret.installed.client_secret,'urn:ietf:wg:oauth:2.0:oob')}function printCodeURL(oauth2client){var scopes=['https://www.googleapis.com/auth/hire.candidate.readonly'];var url=oauth2client.generateAuthUrl({access_type:'offline',scope:scopes});console.log('Follow this url to get an OAuth2 code:\n\n'+url)}function printTokenFromCode(oauth2client,code){oauth2client.getToken(code,function(err,tokens){if(err){console.log('Got error:',err)}else{console.log('Got tokens:',tokens);console.log('Specifically the refresh token is:',tokens.refresh_token)}})}function callHireAPI(pathToDiscoveryDoc,oauth2client,refreshToken){google.discoverAPI(pathToDiscoveryDoc,function(err,hire){if(err){console.error('Failed to generate hire client!');throw err;}oauth2client.setCredentials({refresh_token:refreshToken,});var params={auth:oauth2client,parent:'tenants/my_tenant',};hire.tenants.candidates.list(params,function(err,result){if(err){console.error('Failed to retrieve candidates!');throw err;}console.log('Candidates:',result)})})}
