const { DataTypes, ENUM } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cel: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      photo: {
        type: DataTypes.STRING(512),
      },
      userAuth0: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
