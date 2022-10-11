const express = require("express");

const ObjectService = require("../services/object.service");

const router = express.Router();

const service = new RecipesService();

router.get("/", async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    try {
      const recipes = await service.find();

      res.json(recipes);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const recipe = await service.findName(name);

      res.json(recipe);
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;
