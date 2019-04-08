var google = require('googleapis');
var helpers = require('./google-helpers');
var auth = require('./config/client_auth');

var pathToClientSecret = './config/client_secrets.json';
//var pathToDiscoveryDoc = './config/discoveryDoc.json';
var pathToDiscoveryDoc = 'fakeFile.json'

var oauth2client = helpers.generateOAuth2client(pathToClientSecret);

// use refresh token to make calls to the Hire API
helpers.callHireAPI(pathToDiscoveryDoc, oauth2client, auth.refresh);

