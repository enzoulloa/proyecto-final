const { Ownership } = require("../db.js");
const ownerships = require("./ownership.json");


const getOwnerships = async () => {
  try{
    ownerships.map(async (ownership) => {
      await Ownership.findOrCreate({
        where:{
          name: ownership.name,
          location: ownership.location,
          rooms: ownership.rooms,
          garage: ownership.garage,
          m2: ownership.m2,
          type: ownership.type,
          rating: ownership.rating,
          expenses: ownership.expenses,
          seller: ownership.seller,
          description: ownership.description,
          images: ownership.images,
          state: ownership.state,
          price: ownership.price,
          floors: ownership.floors,
          review: ownership.review,
          address: ownership.address
        }
      })
    })
}
catch(e){console.log(e)}
}

module.exports = {
    getOwnerships,
}