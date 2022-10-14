const { Router } = require("express");
const { Ownership } = require("../db.js");
const { getOwnerships } = require("../middlewares/ownershipsMiddleware.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    await getOwnerships();
    const { rooms } = req.query;
    if (rooms) {
      let filterOs = await Ownership.findAll({
        where: {
          rooms: rooms,
        },
      });
      filterOs
        ? res.status(200).send(filterOs)
        : res
            .status(404)
            .send("No properties were found with that number of rooms");
    } else {
      let ownerships = await Ownership.findAll({ order: ["id"] });
      return res.send(ownerships);
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
      if (findName && type != "department") {
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

module.exports = router;
