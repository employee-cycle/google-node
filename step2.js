/*
 * Generate OAuth2 Code (valid ~30 seconds)
 */
var google = require('googleapis');
var helpers = require('./google-helpers');
var auth = require('./config/client_auth.json');

var pathToClientSecret = './config/client_secrets.json';

var oauth2client = helpers.generateOAuth2client(pathToClientSecret);

helpers.printTokenFromCode(oauth2client, auth.oauth2);
