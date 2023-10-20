const expressAsyncHandler = require("express-async-handler");
const httpStatus = require("http-status");
const { CategoryService } = require("../services");

const createCategory = expressAsyncHandler(async (req, res) => {
  const { body } = req;
  const category = await CategoryService.createCategory(body);
  return res.status(httpStatus.OK).send(category);
});

const getCategory = expressAsyncHandler(async (req, res) => {
  const { categoryId } = req.body;
  const category = await CategoryService.getCategory(categoryId);
  return res.status(httpStatus.OK).send(category);
});
const addCategorytoCategory = expressAsyncHandler(async (req, res) => {
  const { cat1Id, cat2Id } = req.body;
  const category = await CategoryService.addCategorytoCategory(cat1Id, cat2Id);
  return res.status(httpStatus.OK).send(category);
});

module.exports = {
  createCategory,
  getCategory,
  addCategorytoCategory,
};
