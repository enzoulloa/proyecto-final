const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Ownership",
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
      location: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      garage: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      m2: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(
          "Casa",
          "PH",
          "Departamento",
          "Duplex",
          "Terreno",
          "Cochera"
        ),
        allowNull: false,
      },
      expenses: {
        type: DataTypes.BIGINT,
      },
      seller: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      state: {
        type: DataTypes.ENUM("Alquiler", "Venta"),
      },
      price: {
        type: DataTypes.BIGINT,
      },
      floors: {
        type: DataTypes.INTEGER,
      },
      address: {
        type: DataTypes.STRING,
      },
      published: {
        type: DataTypes.ENUM(
          "Revision_Pendiente",
          // "En revision",
          "Publicada",
          "Cancelada",
          "Finalizada"
        ),
      },
      latitude: {
        type: DataTypes.FLOAT,
      },
      longitude: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: false,
    }
  );
};
