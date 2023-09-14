require('dotenv').config({ path: '.env.dev' });
const msal = require('@azure/msal-node');
 
/**
 * Configuration object to be passed to MSAL instance on creation.
 */
const confidentialClientConfigWebApp = {
  auth: {
    clientId: process.env.CLIENT_ID_WEB_APP,
    authority: process.env.CLOUD_INSTANCE + process.env.TENANT_ID_WEB_APP, 
    clientSecret: process.env.CLIENT_SECRET_WEB_APP,
    //navigateToLoginRequestUrl: true, 
  },
  cache: {
    cacheLocation: 'sessionStorage', 
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
        loggerCallback(loglevel, message, containsPii) {
            console.log(message);
        },
        piiLoggingEnabled: false,
        logLevel: msal.LogLevel.Verbose,
    },
},
};

/**
 * Configuration object for create authentication code request url.
 */
const authCodeRequestParameters  = {
  redirectUri: process.env.REDIRECT_URI_WEB_APP,
  responseMode: "query",
  scopes: ["email", "openid", "offline_access", "profile", "User.Read"],
  responseType: "code",
};

/**
 * Configuration object for token request with Authorization code.
 * @param {string} code :The authorization code returned from the first step of OAuth2.0 authentication. 
 * @returns  {object} Configuration object for token request with Authorization code.
 */
const tokenRequestParameters =(code) => ({
  code: code,
  redirectUri: process.env.REDIRECT_URI_WEB_APP,
  grantType: "authorization_code",
  scopes: ["User.Read"],
  enableSpaAuthorizationCode: true,
});

/**
 * Configurations object for token request with refresh token.
 * @param {string} refreshToken : The refresh token returned from a previous request to the Identity provider.
 * @returns {Object} Configuration object for token request with refresh token.
 */
const refreshTokenParameters = (refreshToken) => ({
  refreshToken: refreshToken,
  scopes: ["User.Read"],
});

 
const msalInstanceWebApp = new msal.ConfidentialClientApplication(confidentialClientConfigWebApp);

const myMSALObj = new msal.PublicClientApplication(confidentialClientConfigWebApp);

module.exports = {
  msalConfigWebApp: confidentialClientConfigWebApp,
  msalInstanceWebApp,
  authCodeRequestParameters,
  tokenRequestParameters,
  refreshTokenParameters,
};





