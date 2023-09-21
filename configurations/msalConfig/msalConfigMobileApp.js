require('dotenv').config({ path: '.env.dev' });
const msal = require('@azure/msal-node');
 


const confidentialClientConfigMobileApp = {
  auth: {
      clientId: process.env.CLIENT_ID_MOBILE_APP, 
      authority: process.env.SIGN_UP_SIGN_IN_POLICY_AUTHORITY, 
      clientSecret: process.env.CLIENT_SECRET_MOBILE_APP,
      knownAuthorities: [process.env.AUTHORITY_DOMAIN], //This must be an array
      redirectUri: process.env.REDIRECT_URI_API_FOR_MOBILE_APP,
      validateAuthority: false
  },
  system: {
      loggerOptions: {
          loggerCallback(loglevel, message, containsPii) {
              console.log(message);
          },
          piiLoggingEnabled: false,
          logLevel: msal.LogLevel.Verbose,
      }
  }
};


/**
 * Configuration object for create authentication code request url.
 */
const authCodeRequestParameters  = {
    redirectUri: process.env.REDIRECT_URI_MOBILE_APP,
    scopes: ["openid","offline_access"],
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
/**
 * Object for storing the state of the application.
 */
  const APP_STATES = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    PASSWORD_RESET: 'password_reset',
    EDIT_PROFILE: 'update_profile'
  }

const msalInstanceMobileApp = new msal.ConfidentialClientApplication(confidentialClientConfigMobileApp);


module.exports = {
    msalConfigMobileApp: confidentialClientConfigMobileApp,
    msalInstanceMobileApp,
    authCodeRequestParameters,
    tokenRequestParameters,
    refreshTokenParameters,
    APP_STATES,
};





