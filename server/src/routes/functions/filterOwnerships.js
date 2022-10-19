const { Ownership, Op } = require("../../db");

async function filterOwnerships({ rooms, location, type, min, max, garage }) {
  let filter = {};

  if (rooms) filter.rooms = { rooms };
  if (location) filter.location = { location: { [Op.iRegexp]: location } };
  if (type) filter.type = { type: type };
  if (min) filter.price = { price: { [Op.gt]: min } };
  if (max) filter.price = { price: { [Op.lt]: max } };
  if (min && max) filter.price = { price: { [Op.between]: [min, max] } };
  if (garage) filter.garage = { garage };

  let ownerships = await Ownership.findAll({
    where: {
      ...filter.rooms,
      ...filter.location,
      ...filter.type,
      ...filter.price,
      ...filter.garage,
    },
  });
  return ownerships;
}

module.exports = { filterOwnerships };
