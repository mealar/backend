const { logRequestResponse, createRequestDataWebApp } = require('..//..//utils/logUtils'); // Import the logging function
const { msalInstanceWebApp, authCodeRequestParameters, tokenRequestParameters, refreshTokenParameters } = require("../../configurations/msalConfig/msalConfigWebApp");

/**
 * For generating the authorization URL
 * @return {object} authorization code request URL and params inside of URL
 */
const generateAuthorizationCodeRequestUrl = async (req, res, next) => {
  try {
    const response = await msalInstanceWebApp.getAuthCodeUrl(authCodeRequestParameters);
    const url = new URL(response);
    const params = Object.fromEntries(url.searchParams.entries());
    logRequestResponse(createRequestDataWebApp(req, res, { UrlToGetAuthCode: response, paramsInsideOfUrl: params }, null));
    res.status(200).json({ UrlToGetAuthCode: response, paramsInsideOfUrl: params });
  } catch (error) {
    logRequestResponse(createRequestDataWebApp(req, null, null, error));
    next(error);
  }
};

/**
 * For getting the refresh token from the token cache
 * @returns {string} refresh token
 */
const getRefreshTokenFromCache = () => {
  const tokenCache = msalInstanceWebApp.getTokenCache().serialize();
  const refreshTokenObject = JSON.parse(tokenCache).RefreshToken;
  const refreshToken = refreshTokenObject[Object.keys(refreshTokenObject)[0]].secret;
  return refreshToken;
};



/**
 * For getting the tokens with authorization code
 */
const getTokensWithAuthorizationCode = async (req, res, next) => {
  const code = req.query.code;
  console.log("code", code);
  try {
    const response = await msalInstanceWebApp.acquireTokenByCode(tokenRequestParameters(code));
    const refreshToken = getRefreshTokenFromCache();

    logRequestResponse(createRequestDataWebApp(req, res, { ...response, refreshToken, authenticated: true }, null));

    res.status(200).json({ ...response, refreshToken, authenticated: true });
  } catch (error) {
    logRequestResponse(createRequestDataWebApp(req, null, null, error));

    next(error);
  }
};

/**
 * For getting the tokens with a refresh token
 */
const getTokenWithRefreshToken = async (req, res, next) => {
  const refreshTokenFromReq = req.query.refreshToken;

  try {
    const response = await msalInstanceWebApp.acquireTokenByRefreshToken(refreshTokenParameters(refreshTokenFromReq));
    //const refreshToken = getRefreshTokenFromCache();

    logRequestResponse(createRequestDataWebApp(req, res, { ...response, authenticated: true }, null));

    res.status(200).json({ ...response, authenticated: true });
  } catch (error) {
    logRequestResponse(createRequestDataWebApp(req, null, null, error));

    next(error);
  }
};

/**
 * For signing out
 */
const signOut = async (req, res, next) => {
  try {
    await msalInstanceWebApp.clearCache();

    logRequestResponse(createRequestDataWebApp(req, res, { signOutRequestUrl: process.env.LOGOUT_ENDPOINT_WEB_APP, signedOut: true }, null));

    res.status(200).json({ signOutRequestUrl: process.env.LOGOUT_ENDPOINT_WEB_APP, signedOut: true });
  } catch (error) {
    logRequestResponse(createRequestDataWebApp(req, null, null, error));

    next(error);
  }
};

module.exports = {
  generateAuthorizationCodeRequestUrl,
  getTokensWithAuthorizationCode,
  getTokenWithRefreshToken,
  signOut,
};
