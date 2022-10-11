//requier object, object model de las tablas

function setupModels(sequelize) {
  Object.defineProperties(ObjectSchema, Object.config(sequelize));
  Object.associate(sequelize.models);
}

module.exports = setupModels;