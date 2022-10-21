const { Router } = require("express");
const { Ownership, Op } = require("../db.js");
const { filterOwnerships } = require("./functions/filterOwnerships.js");
const { getOwnerships } = require("../../data/ownershipsData.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { rooms, location, type, min, max, garage } = req.query;
    if (rooms || location || type || min || max || garage) {
      let filteredOwnerships = await filterOwnerships(req.query);
      console.log("filtered");
      filteredOwnerships.length
        ? res.send(filteredOwnerships)
        : res
            .status(404)
            .send("Couldn't find ownerships with that description");
    } else {
      let ownerships = await Ownership.findAll();
      console.log("findall");
      ownerships.length
        ? res.send(ownerships)
        : res.status(404).send("Ownerships not found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let find = await Ownership.findOne({ where: { id: id } });
    if (find) {
      return res.status(200).send(find);
    } else {
      return res.status(404).send("Error 404, not found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      location,
      rooms,
      garage,
      m2,
      type,
      rating,
      expenses,
      seller,
      description,
      images,
      state,
      price,
      floors,
      review,
      address,
    } = req.body;
    if (!location || !rooms || !type || !price || !name || !state) {
      return res
        .status(409)
        .send(
          "Error: location, rooms, type, price, name and state cant be null"
        );
    } else {
      let findName = Ownership.findAll({ where: { name: name } });
      if (findName.length && type != "department") {
        return res.status(412).send("Error: ownership already exist");
      } else {
        Ownership.create({
          name,
          location,
          rooms,
          garage,
          m2,
          type,
          rating,
          expenses,
          seller,
          description,
          images,
          state,
          price,
          floors,
          review,
          address,
        });
        return res.status(200).send("Proccess complete succeffully");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/reviews", async (req, res) => {
  try {
    const { id } = req.query;
    let { stars, message, date } = req.body;
    let ownership = await Ownership.findByPk(id);
    if (!ownership) return res.status(400).send("Propiedad no encontrada");
    if (!stars || !message) return res.status(400).send("Complete su reseña");
    const review = await Review.create({ stars, message,date });
    await ownership.addReview(review);
    res.status(500).send(ownership);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
