const { DataTypes } = require('sequelize')
module.exports = (sequilize) => {
    sequilize.define('Favorite', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        favorite: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
    },
        {
            timestamps: false,
        });
}