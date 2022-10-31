const { Router } = require("express");
const { User } = require("../db.js");

const router = Router();

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let userFind = User.findOne({ where: { id: id } });
  if (userFind) {
    await User.destroy({
      where: { id: id },
    });
    res.status(200).send({ message: "Deleting user" });
  } else {
    res.status(404).send({ message: "Error 412: cant delete user" });
  }
});

module.exports = router;
