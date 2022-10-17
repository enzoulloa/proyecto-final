const { Router } = require("express");
const { Ownership, Op } = require("../db.js");
const { getOwnerships } = require("../middlewares/ownershipsMiddleware.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    await getOwnerships();
    const { rooms, location, type, min, max} = req.query;
    if (location && rooms) {
      let filterOsLocationRooms = await Ownership.findAll({
        where: {
          location: {[Op.iRegexp] : location},
          rooms: rooms,
        },
      });
      filterOsLocationRooms.length
        ? res.status(200).send(filterOsLocationRooms)
        : res
            .status(400)
            .send("There are no ownerships that match your search");
    } else if (location) {
      let filterOsLocation = await Ownership.findAll({
        where: {
          location: {[Op.iRegexp] : location},
        },
      });
      filterOsLocation.length
        ? res.status(200).send(filterOsLocation)
        : res
            .status(404)
            .send("No ownerships were found in that location");
    } else if (rooms) {
      let filterOsRooms = await Ownership.findAll({
        where: {
          rooms: rooms,
        },
      });
      filterOsRooms.length
        ? res.status(200).send(filterOsRooms)
        : res
            .status(404)
            .send("No ownerships were found with that number of rooms");
    }else if (min && max) {
      let filterPrice = await Ownership.findAll({
        where: {
          price: {[Op.between]: [min, max]}
        }
      })
      filterPrice.length
        ? res.status(200).send(filterPrice)
        : res
            .status(404)
            .send("There are no ownerships that match your search");
    } else if (min){
      let filterMinPrice = await Ownership.findAll({
        where: {
          price: {[Op.gt]: min}
        }
      })
      filterMinPrice.length
        ? res.status(200).send(filterMinPrice)
        : res
            .status(404)
            .send("There are no ownerships that match your search");
    }else if (max){
      let filterMaxPrice = await Ownership.findAll({
        where: {
          price: {[Op.lt]: max}
        }
      })
      filterMaxPrice.length
        ? res.status(200).send(filterMaxPrice)
        : res
            .status(404)
            .send("There are no ownerships that match your search");
    }else if (type){
      let filterOsType = await Ownership.findAll({
        where: {
          type: {[Op.iLike] : type}
        }
      });
      filterOsType.length
        ? res.status(200).send(filterOsType)
        : res
            .status(404)
            .send("Couldn't find that type of ownership");
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
      let findName = Ownership.findAll({where:{name: name}})
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

module.exports = router;
