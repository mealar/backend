require("dotenv").config();
const { msalConfigMobileApp, msalInstanceMobileApp, authCodeRequestParameters,
  tokenRequestParameters,
  refreshTokenParameters, APP_STATES } = require("../../configurations/msalConfig/msalConfigMobileApp");

/**
 * This method is used to generate an auth code request URL and redirect the user to that URL.
 * @param {string} authority: the authority to request the auth code from 
 * @param {array} scopes: scopes to request the auth code for 
 * @param {string} state: state of the application (login, logout, password reset, etc.)
 * @param {Object} res: express middleware response object
 */
const GenerateAuthorizationCodeRequestUrl = async (authority, scopes, state, res) => {
  try {

    // prepare the request
    console.log("Fetching Authorization code");
    authCodeRequestParameters.authority = authority;
    scopes && (authCodeRequestParameters.scopes = scopes);
    authCodeRequestParameters.state = state;

    // Each time you fetch Authorization code, update the relevant authority in the tokenRequest configuration
    tokenRequestParameters.authority = authority;

    // request an authorization code to exchange for a token
    const response = await msalInstanceMobileApp.getAuthCodeUrl(authCodeRequestParameters);

    console.log("\nAuthCodeURL: \n" + response);

    // Redirect to the auth code URL/send code to 
    return response;
  } catch (error) {
    return error;
  }
};



/**
 * Handle sign-in request for authorization code request url
 */
const signIn = async (req, res) => {
  try {
    console.log("state", APP_STATES.LOGIN);
    const response = await GenerateAuthorizationCodeRequestUrl(
      process.env.SIGN_UP_SIGN_IN_POLICY_AUTHORITY,
      null,
      APP_STATES.LOGIN,
      res
    );
    console.log("\nAuthCodeURL: \n" + response);
    res.status(200).json({ UrlToGetAuthCodeForSignIn: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * Handle edit profile request for authorization code request url
 */
const editProfile = async (req, res) => {
  try {
    const response = await GenerateAuthorizationCodeRequestUrl(
      process.env.EDIT_PROFILE_POLICY_AUTHORITY,
      null,
      APP_STATES.EDIT_PROFILE,
      res
    );
    res.status(200).json({ UrlToGetAuthCodeForProfileEditing: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * Handle password reset request for authorization code request url
 */
const passwordReset = async (req, res) => {
  try {
    const response = await GenerateAuthorizationCodeRequestUrl(
      process.env.PASSWORD_RESET_POLICY_AUTHORITY,
      null,
      APP_STATES.PASSWORD_RESET,
      res
    );
    res.status(200).json({ UrlToGetAuthCodeForPasswordReset: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect(process.env.LOGOUT_ENDPOINT_MOBILE_APP);
  });
};


/**
 * For getting the tokens with authorization code
 */
const getTokensWithAuthorizationCode = async (req, res, next) => {
  const code = req.query.code;
  try {
    const response = await msalInstanceMobileApp.acquireTokenByCode(tokenRequestParameters(code));
    /**
    * For getting the refresh token from token cache
    * @returns {string} refresh token
    */
    const refreshToken = () => {
      const tokenCache = msalInstanceMobileApp.getTokenCache().serialize();
      const refreshTokenObject = JSON.parse(tokenCache).RefreshToken;
      const refreshToken = refreshTokenObject[Object.keys(refreshTokenObject)[0]].secret;
      return refreshToken;
    };
    return { ...response, refreshToken: refreshToken(), authenticated: true };
  } catch (error) {
    return error;
  }
};
/**
 * For handling authentication redirects
 */
const handleRedirects = async (req, res, next) => {

  if (req.query.state === APP_STATES.LOGIN) {

    try {
      const response = await getTokensWithAuthorizationCode(req, res, next);
      res.status(200).json({ TokenResponseForSignIn: response });
    } catch (error) {
      next({ message: error.message });
    }

  } else if (req.query.state === APP_STATES.PASSWORD_RESET) {
    if (req.query.error) {
      if (JSON.stringify(req.query.error_description).includes('AADB2C90091')) {
        req.status(499).send(`Error: User has cancelled the operation  \nError Description: ${req.query.error_description}`);
      }
      else {
        res.status(500).send(`Error: ${req.query.error}\nError Description: ${req.query.error_description}`);
      }
    } else {
      res.status(200).send('Password has been reset successfully!');
    }
  } else if (req.query.state === APP_STATES.EDIT_PROFILE) {
    try {
      const response = await getTokensWithAuthorizationCode(req, res, next);
      res.status(200).json({ TokenResponseForSignIn: response });
    } catch (error) {
      next({ message: error.message });
    }
  } else {
    res.status(500).send('We do not recognize this response!');
  }
};

module.exports = {
  signIn,
  signOut,
  handleRedirects,
  editProfile,
  passwordReset,
}; 
