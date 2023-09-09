require("dotenv").config();
const { msalInstanceWebApp, authCodeRequestParameters, tokenRequestParameters, } = require("../../configurations/msalConfig/msalConfigWebApp");



/**
 * For generating the authorization url
 * @return {string} authorization code request url
 */
const GenerateAuthorizationCodeRequestUrl = async (req, res, next) => {
  try {
    const response = await msalInstanceWebApp.getAuthCodeUrl(authCodeRequestParameters);
    res.status(200).json({ UrlToGetAuthCode: response });
  } catch (error) {
    next(error);
  }
}

/**
 * For getting the tokens with authorization code
 */
const getTokensWithAuthorizationCode = async (req, res, next) => {
  const code = req.query.code;
  try {
    const response = await msalInstanceWebApp.acquireTokenByCode(tokenRequestParameters(code));
    /**
     * For getting the refresh token from token cache
     * @returns {string} refresh token
     */
    const refreshToken = () => {
      const tokenCache = msalInstanceWebApp.getTokenCache().serialize();
      const refreshTokenObject = JSON.parse(tokenCache).RefreshToken;
      const refreshToken = refreshTokenObject[Object.keys(refreshTokenObject)[0]].secret;
      return refreshToken;
    };
    res.status(200).json({ ...response, refreshToken: refreshToken(), authenticated: true });
  } catch (error) {
    next(error);
  }
};
/**
 * For getting the tokens with refresh token
 */
const getTokenWithRefreshToken = async (req, res, next) => {
  const refreshToken = req.query.refreshToken;
  try {
    const response = await msalInstanceWebApp.acquireTokenByRefreshToken(refreshTokenParameters(refreshToken));
    res.status(200).json({ ...response, authenticated: true });
  } catch (error) {
    next(error);
  }
};


const signOutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect(process.env.LOGOUT_ENDPOINT_MOBILE_APP);
  });
};


 

module.exports = {
  GenerateAuthorizationCodeRequestUrl,
  getTokensWithAuthorizationCode,
  getTokenWithRefreshToken,
  signOutUser,
};

