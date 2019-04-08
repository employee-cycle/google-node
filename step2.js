/*
 * Generate Refrest Token from Auth Token
 */
var google = require('googleapis');
var helpers = require('./google-helpers');
var auth = require('./config/client_auth.json');

var pathToClientSecret = './config/client_secrets.json';

var oauth2client = helpers.generateOAuth2client(pathToClientSecret);

helpers.printTokenFromCode(oauth2client, auth.oath);
