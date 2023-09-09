const express = require("express");
const restaurantRoute = require("./restaurantRoute");
const categoryRoute = require("./categoryRoute");
const menuRoute = require("./menuRoute");
const authRoutesMobileApp = require("./auth/authRoutesMobileApp");
const authRoutesWebApp = require("./auth/authRoutesWebApp");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/restaurant",
    route: restaurantRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/menu",
    route: menuRoute,
  },
  {
    path: "/authMobileApp",
    route: authRoutesMobileApp,
  },
  {
    path: "/authWebApp",
    route: authRoutesWebApp,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
