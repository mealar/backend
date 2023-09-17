const express = require("express");
const restaurantRoute = require("./restaurant.route");
const categoryRoute = require("./category.route");
const menuRoute = require("./menu.route");
const dishRoute = require("./dish.route");
const additionRoute = require("./addition.route");
const additionGroupRoute = require("./additionGroup.route");
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
    path: "/dish",
    route: dishRoute,
  },
  {
    path: "/addition",
    route: additionRoute,
  },
  {
    path: "/addition-group",
    route: additionGroupRoute,
  },
  { path: "/authMobileApp", route: authRoutesMobileApp },
  {
    path: "/authWebApp",
    route: authRoutesWebApp,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
