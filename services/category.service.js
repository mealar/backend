const httpStatus = require("http-status");
const mongoose = require("mongoose");
const { Category, Restaurant } = require("../models");
const ApiError = require("../utils/ApiError");

const getCategory = async (categoryId) => {
  const pipeline = [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(categoryId),
      },
    },
    {
      $lookup: {
        from: "dishes",
        localField: "entities.dish",
        foreignField: "_id",
        as: "entities.dish",
      },
    },
    {
      $lookup: {
        from: "menus",
        localField: "entities.menu",
        foreignField: "_id",
        as: "entities.menu",
      },
    },
    {
      $lookup: {
        from: "additiongroups",
        localField: "entities.dish.additions",
        foreignField: "_id",
        as: "dishAdditions",
      },
    },

    {
      $lookup: {
        from: "additions",
        localField: "entities.dish.additions.additionObjects",
        foreignField: "_id",
        as: "additionObjects",
      },
    },

    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        isActive: 1,
        createBy: 1,
        expiryDateTime: 1,
        images: 1,
        lastModifiedBy: 1,
        entities: {
          dish: {
            $map: {
              input: "$entities.dish",
              as: "dish",
              in: {
                $mergeObjects: [
                  "$$dish",
                  {
                    additions: {
                      $filter: {
                        input: "$dishAdditions",
                        as: "addition",
                        cond: { $in: ["$$addition._id", "$$dish.additions"] },
                      },
                    },
                  },
                ],
              },
            },
          },
          menu: {
            $map: {
              input: "$entities.menu",
              as: "menu",
              in: {
                $mergeObjects: [
                  "$$menu",
                  {
                    additions: {
                      $filter: {
                        input: "$dishAdditions",
                        as: "addition",
                        cond: { $in: ["$$addition._id", "$$menu.additions"] },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },
  ];
  const category = await Category.aggregate(pipeline);
  return category[0];
};

// const getCategory = async (categoryId) => {
//   const category = await Category.findById(categoryId).populate({
//     path: "entities.dish",
//     model: "Dish",
//     populate: {
//       path: "additions",
//       model: "additionGroup",
//       populate: {
//         path: "additionObjects",
//         model: "addition",
//       },
//     },
//   });

//   return category;
// };

const createCategory = async (body) => {
  const restaurant = await Restaurant.findById(body.restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
  const category = new Category(body);
  const newCategory = await category.save();
  restaurant.categories.push(newCategory);
  await restaurant.save();
  return newCategory;
};

const updateCategoryInRestaurant = async (restaurantId, categoryId) => {
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    return "Restaurant Not Found.";
  }
  const catId = new mongoose.Types.ObjectId(categoryId);
  const categoryIndex = restaurant.categories.findIndex(
    (category) => category._id.toString() === catId.toString()
  );
  if (categoryIndex !== -1) {
    const updatedCategory = await getCategory(categoryId);
    restaurant.categories[categoryIndex] = updatedCategory;
    await restaurant.save();
    return "Category Updated in restaurant Successfully .";
  } else {
    return "Category Not Updated in restaurant.";
  }
};
module.exports = {
  getCategory,
  createCategory,
  updateCategoryInRestaurant,
};
