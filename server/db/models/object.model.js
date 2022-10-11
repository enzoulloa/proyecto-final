//ej
const { DataTypes, Model } = require("sequelize");

const { RECIPE_TABLE } = require("./recipe.model");

const { TYPE_TABLE } = require("./type.model");

const RECIPE_TYPE_TABLE = "recipe_type";

const RecipeTypeSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  recipeId: {
    allowNull: false,
    field: "recipe_id",
    type: DataTypes.INTEGER,
    references: {
      model: RECIPE_TABLE,
      key: "id",
    },
  },
  typeId: {
    allowNull: false,
    field: "type_id",
    type: DataTypes.INTEGER,
    references: {
      model: TYPE_TABLE,
      key: "id",
    },
  },
};

class RecipeType extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: RECIPE_TYPE_TABLE,
      modelName: "RecipeType",
      timestamps: false,
    };
  }
}

module.exports = { RECIPE_TYPE_TABLE, RecipeTypeSchema, RecipeType };
