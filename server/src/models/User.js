const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      reviews: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
        defaultValue: null,
      },
      favorites: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: null,
      },
  },
  {
    timestamps: false
  });
};