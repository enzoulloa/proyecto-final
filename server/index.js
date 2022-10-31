const { getOwnerships } = require("./data/ownershipsData.js");
const { getUsers } = require("./data/userData.js");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync({ force: false }).then(() => {
  getOwnerships();
  getUsers();
  server.listen(process.env.PORT, () => {
    console.log("%s listening at PORT");
  });
});
