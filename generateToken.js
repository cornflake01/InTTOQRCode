const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const readline = require('readline');

const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const loadCredentials = () => {
  return JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
};

const getNewToken = (oAuth2Client) => {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to', TOKEN_PATH);
        resolve();
      });
    });
  });
};

const authorize = () => {
  const { client_secret, client_id, redirect_uris } = loadCredentials().installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  try {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    return Promise.resolve(oAuth2Client);
  } catch (err) {
    console.log('No token found, requesting new token...');
    return getNewToken(oAuth2Client);
  }
};

authorize().catch(console.error);
