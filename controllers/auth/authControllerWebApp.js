require("dotenv").config();
const { msalInstanceWebApp, authCodeRequestParameters, tokenRequestParameters, } = require("../../configurations/msalConfig/msalConfigWebApp");



/**
 * For generating the authorization url
 * @return {object} authorization code request url and params inside of url
 */
const GenerateAuthorizationCodeRequestUrl = async (req, res, next) => {
  try {
    const response = await msalInstanceWebApp.getAuthCodeUrl(authCodeRequestParameters);
    const url = new URL(response);
    const params = Object.fromEntries(url.searchParams.entries());

    res.session = req.session;
    res.status(200).json({ UrlToGetAuthCode: response, paramsInsideOfUrl: params });
  } catch (error) {
    next(error);
  }
}

/**
    * For getting the refresh token from token cache
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
  try {
    const response = await msalInstanceWebApp.acquireTokenByCode(tokenRequestParameters(code));
    const refreshToken = getRefreshTokenFromCache();
    res.status(200).json({ ...response, refreshToken, authenticated: true });
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
    const refreshToken = getRefreshTokenFromCache();
    res.status(200).json({ ...response, refreshToken, authenticated: true });
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

