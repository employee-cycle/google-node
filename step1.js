/*
 * Generate oauth2client Sign in URL from client_secrets.json
 */

var google = require('googleapis');
var helpers = require('./google-helpers');

var pathToClientSecret = './config/client_secrets.json';
var pathToDiscoveryDoc = './config/discoveryDoc.json';

// Generate an oauth2client
var oauth2client = helpers.generateOAuth2client(pathToClientSecret);

// Get OAuth2 code (valid ~30 seconds)
helpers.printCodeURL(oauth2client);
