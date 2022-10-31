const express = require("express");
const router = express.Router();
const { Review, User, Ownership } = require("../db.js");

router.get("/:ownerID", async (req, res) => {
  try {
    const ownerID = req.params.ownerID;
    const allReview = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "photo", "id"],
        },
        {
          model: Ownership,
          where: { id: ownerID },
          attributes: ["name", "id"],
        },
      ],
    });
    res.status(200).send(allReview);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Review not found");
  }
});

router.post("/", async (req, res) => {
  try {
    const { ownerID, userID } = req.query;
    let { stars, message } = req.body;
    let ownership = await Ownership.findByPk(ownerID);
    let user = await User.findByPk(userID);
    if (!ownership) return res.status(400).send("Propiedad no encontrada");
    if (!stars || !message) return res.status(400).send("Complete su reseña");
    const review = await Review.create({ stars, message });
    await ownership.addReview(review);
    await user.addReview(review);
    res.status(200).send("Reseña creada");
  } catch (error) {
    console.log(error);
    return res
      .status(410)
      .send({ error: "Cant create review, see console for more details" });
  }
});

module.exports = router;
