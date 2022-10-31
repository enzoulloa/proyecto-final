const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('UserAuth0', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
      },
      cel: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: true,
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      photo: {
        type: DataTypes.STRING(512)
      },
      userFavotire:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      userAuth0: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
  },{
    timestamps: false
  })}