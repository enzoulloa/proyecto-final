const { Router } = require("express");
const { Ownership, Op, Sales, Review } = require("../db.js");
const { filterOwnerships } = require("./functions/filterOwnerships.js");
const { getOwnerships } = require("../../data/ownershipsData.js");
const sales = require("../models/sales.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { state, rooms, location, type, min, max, garage, published } =
      req.query;
    console.log(published);
    if (
      rooms ||
      location ||
      type ||
      min ||
      max ||
      garage ||
      state ||
      published
    ) {
      let filteredOwnerships = await filterOwnerships(req.query);
      filteredOwnerships.length
        ? res.send(filteredOwnerships)
        : res
            .status(404)
            .send("Couldn't find ownerships with that description");
    } else {
      let ownerships = await Ownership.findAll();
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
    let find = await Ownership.findOne({
      where: { id: id },
      include: [
        {
          model: Sales,
        },
        {
          model: Review,
        },
      ],
    });
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
      expenses,
      seller,
      description,
      images,
      state,
      price,
      floors,
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
          expenses,
          seller,
          description,
          images,
          state,
          price,
          floors,
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
    let { stars, message } = req.body;
    let ownership = await Ownership.findByPk(id);
    if (!ownership) return res.status(400).send("Propiedad no encontrada");
    if (!stars || !message) return res.status(400).send("Complete su reseña");
    const review = await Review.create({ stars, message });
    const final = await ownership.addReview(review);
    res.status(200).send(final);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
