const { DataTypes } = require('sequelize')
module.exports = (sequilize) => {
    sequilize.define('Score', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ownershipId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
        {
            timestamps: false,
        });
}