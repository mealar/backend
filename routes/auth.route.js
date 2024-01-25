const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.render("index", { title: "Express demo" });
});

module.exports = router;
