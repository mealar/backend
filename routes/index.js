const express = require("express");
const restaurantRoute = require("./restaurantRoute");
const categoryRoute = require("./categoryRoute");
const menuRoute = require("./menuRoute");
const dishRoute = require("./dishRoute");
const additionRoute = require("./additionRoute");
const additionGroupRoute = require("./additionGroupRoute");

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
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
