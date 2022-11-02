const { Ownership, Op } = require("../../db");

async function filterOwnerships({
  rooms,
  location,
  type,
  min,
  max,
  garage,
  state,
  published,
}) {
  let filter = {};
  parseInt(min);
  parseInt(max);
  let a = published.split("/");
  if (a.length) {
    filter.published = {
      published: { [Op.or]: a },
    };
    console.log(filter.published);
  } else {
    filter.published = { published };
  }

  if (rooms) filter.rooms = { rooms };
  if (state) filter.state = { state };
  if (location) filter.location = { location: { [Op.iRegexp]: location } };
  if (type) filter.type = { type };
  if (min && min <= max) filter.price = { price: { [Op.gt]: min } };
  if (max && max >= min) filter.price = { price: { [Op.lt]: max } };
  if (min && max) filter.price = { price: { [Op.between]: [min, max] } };
  if (garage) filter.garage = { garage };
  // if (published) filter.published = { published };

  let ownerships = await Ownership.findAll({
    where: {
      ...filter.rooms,
      ...filter.location,
      ...filter.type,
      ...filter.price,
      ...filter.garage,
      ...filter.state,
      ...filter.published,
    },
  });
  return ownerships;
}

module.exports = { filterOwnerships };
