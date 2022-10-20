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
      },
      cel: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true,
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      userAuth0: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
  },{
    timestamps: false
  })}