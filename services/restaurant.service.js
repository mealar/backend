const httpStatus = require("http-status");
const { Restaurant } = require("../models");
const ApiError = require("../utils/ApiError");

const getOwnerRestaurants = async (ownerId) => {
  // const restaurants = await Restaurant.aggregate([
  //   {
  //     $match: { ownerId, status: "active" },
  //   },
  //   {
  //     $lookup: {
  //       from: "categories",
  //       localField: "categories",
  //       foreignField: "_id",
  //       as: "categoriesData",
  //     },
  //   },
  //   {
  //     $unwind: "$categoriesData",
  //   },
  //   {
  //     $lookup: {
  //       from: "dishes",
  //       localField: "categoriesData.entities.dish",
  //       foreignField: "_id",
  //       as: "categoriesData.entities.dishData",
  //     },
  //   },
  //   {
  //     $unwind: "$categoriesData.entities.dishData",
  //   },
  //   {
  //     $lookup: {
  //       from: "additiongroups", // additionGroups koleksiyonunun adını değiştirin
  //       localField: "categoriesData.entities.dishData.additions",
  //       foreignField: "_id",
  //       as: "categoriesData.entities.dishData.additionsData",
  //     },
  //   },
  //   {
  //     $unwind: "$categoriesData.entities.dishData.additionsData",
  //   },
  //   {
  //     $lookup: {
  //       from: "additions", // additions koleksiyonunun adını değiştirin
  //       localField:
  //         "categoriesData.entities.dishData.additionsData.additionObjects",
  //       foreignField: "_id",
  //       as: "categoriesData.entities.dishData.additionsData.additionObjectsData",
  //     },
  //   },
  //   {
  //     $unwind:
  //       "$categoriesData.entities.dishData.additionsData.additionObjectsData",
  //   },
  //   {
  //     $lookup: {
  //       from: "menus", // menus koleksiyonunun adını değiştirin
  //       localField: "categoriesData.entities.menu",
  //       foreignField: "_id",
  //       as: "categoriesData.entities.menuData",
  //     },
  //   },
  //   {
  //     $unwind: "$categoriesData.entities.menuData",
  //   },
  //   {
  //     $lookup: {
  //       from: "additiongroups", // additionGroups koleksiyonunun adını değiştirin
  //       localField: "categoriesData.entities.menuData.additions",
  //       foreignField: "_id",
  //       as: "categoriesData.entities.menuData.additionsData",
  //     },
  //   },
  //   {
  //     $unwind: "$categoriesData.entities.menuData.additionsData",
  //   },
  //   {
  //     $lookup: {
  //       from: "additions", // additions koleksiyonunun adını değiştirin
  //       localField:
  //         "categoriesData.entities.menuData.additionsData.additionObjects",
  //       foreignField: "_id",
  //       as: "categoriesData.entities.menuData.additionsData.additionObjectsData",
  //     },
  //   },
  //   {
  //     $unwind:
  //       "$categoriesData.entities.menuData.additionsData.additionObjectsData",
  //   },
  //   {
  //     $lookup: {
  //       from: "tables",
  //       localField: "tables",
  //       foreignField: "_id",
  //       as: "tablesData",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "orders",
  //       localField: "orders",
  //       foreignField: "_id",
  //       as: "ordersData",
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       name: 1,
  //       // Diğer alanları eklemeye devam edin
  //       categoriesData: {
  //         _id: "$categoriesData._id",
  //         // Diğer kategori alanlarını ekleyin
  //         entities: {
  //           dishData: {
  //             _id: "$categoriesData.entities.dishData._id",
  //             // Diğer dish alanlarını ekleyin
  //             additionsData: {
  //               _id: "$categoriesData.entities.dishData.additionsData._id",
  //               // Diğer addition alanlarını ekleyin
  //               additionObjectsData: {
  //                 _id: "$categoriesData.entities.dishData.additionsData.additionObjectsData._id",
  //                 // Diğer additionObject alanlarını ekleyin
  //               },
  //             },
  //           },
  //           menuData: {
  //             _id: "$categoriesData.entities.menuData._id",
  //             // Diğer menu alanlarını ekleyin
  //             additionsData: {
  //               _id: "$categoriesData.entities.menuData.additionsData._id",
  //               // Diğer addition alanlarını ekleyin
  //               additionObjectsData: {
  //                 _id: "$categoriesData.entities.menuData.additionsData.additionObjectsData._id",
  //                 // Diğer additionObject alanlarını ekleyin
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // ]);

  const restaurants = await Restaurant.find({
    ownerId,
    status: "active",
  })
    .populate({
      path: "categories",
      populate: [
        {
          path: "entities.dish",
          model: "Dish",
          populate: {
            path: "additions",
            model: "additionGroup",
            populate: {
              path: "additionObjects",
              model: "addition",
            },
          },
        },
        {
          path: "entities.menu",
          model: "Menu",
          populate: {
            path: "additions",
            model: "additionGroup",
            populate: {
              path: "additionObjects",
              model: "addition",
            },
          },
        },
      ],
    })
    .populate("tables")
    .populate("orders");

  if (!restaurants) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurants not found");
  }
  return restaurants;
};
const getAllRestaurants = async () => {
  const restaurants = await Restaurant.find();
  if (!restaurants) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurants not found");
  }
  return restaurants;
};

const createRestaurant = async (body) => {
  const restaurant = new Restaurant(body);
  const newRestaurant = await restaurant.save();
  return newRestaurant;
};

const getRestaurant = async (restaurantId) => {
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
  return restaurant;
};

const updateRestaurant = async (updateBody, restaurantId) => {
  const restaurant = await Restaurant.findByIdAndUpdate({
    _id: restaurantId,
  });
  Object.assign(restaurant, updateBody);

  restaurant.save();

  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
  return restaurant;
};

const deleteRestaurant = async (restaurantId) => {
  const restaurant = await Restaurant.findById(restaurantId);

  if (restaurant && restaurant.status !== "deleted") {
    restaurant.status = "deleted";
    restaurant.save();
    return { message: "Restaurant Deleted" };
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
};

module.exports = {
  createRestaurant,
  deleteRestaurant,
  getOwnerRestaurants,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
};
