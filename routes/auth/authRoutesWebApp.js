const express = require("express");
const router = express.Router();
const { authControllerWebApp } = require("../../controllers");

router.get("/SignIn", authControllerWebApp.GenerateAuthorizationCodeRequestUrl);
router.get("/GetTokenWithCode", authControllerWebApp.getTokensWithAuthorizationCode);
router.get("/SignOut", authControllerWebApp.signOutUser);
router.get("/GetTokenWithRefreshToken", authControllerWebApp.getTokenWithRefreshToken); 

module.exports = router;