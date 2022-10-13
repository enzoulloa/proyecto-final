const { DataTypes, ENUM } = require('sequelize');
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
      cel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM(1,2,3,4),
        defaultValue: 1,
      },
      photo: {
        type: DataTypes.STRING(512)
      }
  },
  {
    timestamps: false
  });
};