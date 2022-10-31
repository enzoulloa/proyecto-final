const { DataTypes } = require("sequelize");

module.exports = (sequilize) => {
  sequilize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stars: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
        defaultValue: null,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
