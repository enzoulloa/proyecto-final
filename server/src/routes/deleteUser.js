const { Router } = require("express");
const { User } = require("../db.js");

const router = Router();

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { newStatus } = req.body;
  try {
    let user = await User.findByPk(parseInt(id));
    console.log(user);
    if (user) {
      await user.update({
        status: newStatus,
      });
      res.status(200).send({ message: "User banned" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Error 412: cant ban user" });
  }
});

module.exports = router;
