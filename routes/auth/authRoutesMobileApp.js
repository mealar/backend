const express = require("express");
const router = express.Router();
const { authControllerMobileApp } = require("../../controllers");

router.get("/SignIn", authControllerMobileApp.signIn);
router.get("/SigOut", authControllerMobileApp.signOut);
router.get("/editProfile", authControllerMobileApp.editProfile);
router.get("/passwordReset", authControllerMobileApp.passwordReset);
router.get("/", authControllerMobileApp.handleRedirects);


module.exports = router;