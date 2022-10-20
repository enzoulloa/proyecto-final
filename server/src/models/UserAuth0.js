const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('UserAuth0', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    photo: {
        type: DataTypes.STRING(512)
      }
  },{
    timestamps: false
  })}