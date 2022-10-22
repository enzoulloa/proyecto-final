const { Ownership } = require("../src/db");
const ownerships = require("./ownership.json");

async function getOwnerships() {
  try {
    if (!(await Ownership.findAll()).length) {
      ownerships.map(async (ownership) => {
        await Ownership.findOrCreate({
          where: {
            name: ownership.name,
            location: ownership.location,
            rooms: ownership.rooms,
            garage: ownership.garage,
            m2: ownership.m2,
            type: ownership.type,
            expenses: ownership.expenses,
            seller: ownership.seller,
            description: ownership.description,
            images: ownership.images,
            state: ownership.state,
            price: ownership.price,
            floors: ownership.floors,
            review: ownership.review,
            address: ownership.address,
          },
        });
      });
      console.log("Propiedades cargadas a la db")
    } else {
      console.log("Propiedades obtenidas")
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getOwnerships,
};
