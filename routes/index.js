const express = require("express");
const restaurantRoute = require("./restaurantRoute");
const categoryRoute = require("./categoryRoute");
const menuRoute = require("./menuRoute");

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
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
