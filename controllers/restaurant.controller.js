const expressAsyncHandler = require("express-async-handler");
const { RestaurantService } = require("../services");
const httpStatus = require("http-status");

const getOwnerRestaurants = expressAsyncHandler(async (req, res) => {
  const { ownerId } = req.params;
  const restaurants = await RestaurantService.getOwnerRestaurants(ownerId);
  if (!restaurants) {
    return res.status(httpStatus.NOT_FOUND).send.error({
      message: "Restaurant not found",
    });
  }
  return res.status(httpStatus.OK).send(restaurants);
});

const getAllRestaurants = expressAsyncHandler(async (req, res) => {
  const restaurants = await RestaurantService.getAllRestaurants();
  if (!restaurants) {
    return res.status(httpStatus.NOT_FOUND).send.error({
      message: "Restaurant not found",
    });
  }
  return res.status(httpStatus.OK).send(restaurants);
});

const createRestaurant = expressAsyncHandler(async (req, res) => {
  const restaurant = await RestaurantService.createRestaurant(req.body);
  if (!restaurant) {
    return res.status(httpStatus.NOT_FOUND).send.error({
      message: "Restaurant not created",
    });
  }
  return res.status(httpStatus.OK).send(restaurant);
});

const getRestaurant = expressAsyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await RestaurantService.getRestaurant(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
  return res.status(httpStatus.OK).send(restaurant);
});

const getRestaurantwithAllCategories = expressAsyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await RestaurantService.getRestaurantwithAllCategories(
    restaurantId
  );
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
  return res.status(httpStatus.OK).send(restaurant);
});

const updateRestaurant = expressAsyncHandler(async (req, res) => {
  const updateBody = { ...req.body };
  const { restaurantId } = req.params;
  const restaurant = await RestaurantService.updateRestaurant(
    updateBody,
    restaurantId
  );
  if (!restaurant) {
    return res.status(httpStatus.NOT_FOUND).send.error({
      message: "Restaurant not updated",
    });
  }
  return res.status(httpStatus.OK).send(restaurant);
});

const deleteRestaurant = expressAsyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await RestaurantService.deleteRestaurant(restaurantId);

  if (!restaurant) {
    return res.status(httpStatus.NOT_FOUND).send.error({
      message: "Restaurant not deleted",
    });
  }
  return res.status(httpStatus.OK).send({
    message: "Restaurant is deleted",
  });
});

const selectMenu = expressAsyncHandler(async (req, res) => {
  const { restaurantId, menuId } = req.body;
  const selectedMenu = await RestaurantService.selectMenu(restaurantId, menuId);
  console.log(selectedMenu);
  return res.status(httpStatus.OK).send(selectedMenu);
});

module.exports = {
  createRestaurant,
  deleteRestaurant,
  getOwnerRestaurants,
  getAllRestaurants,
  getRestaurant,
  getRestaurantwithAllCategories,
  updateRestaurant,
  selectMenu,
};
