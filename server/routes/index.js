const express = require("express");

function routerAPI(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/objetos", objectRouter); //agrego todas las rutas
}

module.exports = routerAPI;
