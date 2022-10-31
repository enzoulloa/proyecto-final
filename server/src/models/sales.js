const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Sales', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM('approved', 'in_process', 'failed', 'pending'),
        allowNull: false
    },
    state_detail: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    timestamps: false
  });
};