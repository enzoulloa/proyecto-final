const { Router } = require("express");
const {
  User,
  UserAuth0,
  Ownership,
  UserOwnerships,
  UserAuth0Ownerships,
} = require("../db.js");
const bcrypt = require("bcryptjs");
const { getUsers } = require("../../data/userData");
const nodemailer = require("nodemailer");

const router = Router();

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "enzo.ulloa.i@gmail.com",
    pass: "koywxiscacvjrugy",
  },
});


router.get("/", async (req, res) => {
  let users = await User.findAll({
    order: ["id"],
    include: {
      model: Ownership,
      attributes: [
        "id",
        "name",
        "location",
        "rooms",
        "garage",
        "m2",
        "type",
        "expenses",
        "seller",
        "description",
        "images",
        "state",
        "price",
        "floors",
        "address",
      ],
      through: {
        attributes: [],
      },
    },
  });
  let usersAuth0 = await UserAuth0.findAll({
    order: ["id"],
    include: {
      model: Ownership,
      attributes: [
        "id",
        "name",
        "location",
        "rooms",
        "garage",
        "m2",
        "type",
        "expenses",
        "seller",
        "description",
        "images",
        "state",
        "price",
        "floors",
        "address",
      ],
      through: {
        attributes: [],
      },
    },
  });
  const allUsers = [...users, ...usersAuth0];
  res.send(allUsers);
});

router.get("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    let find = await User.findOne({
      where: { name: name },
      include: {
        model: Ownership,
        attributes: [
          "id",
          "name",
          "location",
          "rooms",
          "garage",
          "m2",
          "type",
          "expenses",
          "seller",
          "description",
          "images",
          "state",
          "price",
          "floors",
          "address",
        ],
        through: {
          attributes: [],
        },
      },
    });
    let findAuth0 = await UserAuth0.findOne({
      where: { name: name },
      include: {
        model: Ownership,
        attributes: [
          "id",
          "name",
          "location",
          "rooms",
          "garage",
          "m2",
          "type",
          "expenses",
          "seller",
          "description",
          "images",
          "state",
          "price",
          "floors",
          "address",
        ],
        through: {
          attributes: [],
        },
      },
    });

    if (find) {
      return res.status(200).send(find);
    } else if (findAuth0) {
      return res.status(200).send(findAuth0);
    } else {
      return res.status(404).send("Error 404, not found");
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send("Error de protocolo, mirar consola para mas detalle");
  }
});

router.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      var findId = await UserAuth0.findOne({
        where: { id: id },
        include: {
          model: Ownership,
          attributes: [
            "id",
            "name",
            "location",
            "rooms",
            "garage",
            "m2",
            "type",
            "expenses",
            "seller",
            "description",
            "images",
            "state",
            "price",
            "floors",
            "address",
          ],
          through: {
            attributes: [],
          },
        },
      });
    } else {
      var findId = await User.findOne({
        where: { id: id },
        include: {
          model: Ownership,
          attributes: [
            "id",
            "name",
            "location",
            "rooms",
            "garage",
            "m2",
            "type",
            "expenses",
            "seller",
            "description",
            "images",
            "state",
            "price",
            "floors",
            "address",
          ],
          through: {
            attributes: [],
          },
        },
      });
    }
    return res.status(200).send(findId);
  } catch (err) {
    return res
      .status(500)
      .send("Error de protocolo, mirar consola para mas detalle");
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, cel, photo } = req.body;
  let findName = await User.findAll({ where: { name: name } });
  let findEmail = await User.findAll({ where: { email: email } });

  const registerMessage = {
    from: "'Henry Inmobiliaria' <henryinmobiliaria@gmail.com>",
    to: email,
    subject: `Gracias por registrarte en Henry Inmobiliaria`,
    text: `Bienvenido ${name} a Henry Inmobiliaria, su registro fue completado con exito`,
    html: `<p style="text-align:center;">Bienvenido ${name} a Henry Inmobiliaria, su registro fue completado con exito</p>
    </br>
    <div style="text-align:center;">
    <img src="https://isewa.org.in/wp-content/uploads/2021/06/success.gif" alt="thanks!" />
    </div>`,
  };

  try {
    if (!name || !email || !password) {
      return res.status(412).send("Parameters name, email and password cant be null");
    } else if (findName.length || findEmail.length) {
      return res.status(409).send("User already exist");
    } else {
      let encrypted = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: encrypted,
        cel,
        photo: photo ? photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
      });
      const info = await transport.sendMail(registerMessage);
      console.log("message send", info);
      return res.status(200).send("User created succeffully");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error: see console to fix it");
  }
});

router.put("/addfavorite", async (req, res) => {
  const { id, idUser } = req.body;

  let ownership = await Ownership.findOne({ where: { id: id } });
  if (isNaN(idUser)) {
    var find = await UserAuth0.findOne({
      where: { id: idUser },
      include: {
        model: Ownership,
        attributes: [
          "id",
          "name",
          "location",
          "rooms",
          "garage",
          "m2",
          "type",
          "expenses",
          "seller",
          "description",
          "images",
          "state",
          "price",
          "floors",
          "address",
        ],
        through: {
          attributes: [],
        },
      },
    });
  } else {
    var find = await User.findOne({
      where: { id: idUser },
      include: {
        model: Ownership,
        attributes: [
          "id",
          "name",
          "location",
          "rooms",
          "garage",
          "m2",
          "type",
          "expenses",
          "seller",
          "description",
          "images",
          "state",
          "price",
          "floors",
          "address",
        ],
        through: {
          attributes: [],
        },
      },
    });
  }

  if (ownership) {
    if (find) {
      await find.addOwnership(ownership);
      return res.status(201).send("Added to favotire");
    }
  }
  return res.status(500).send({
    Error:
      "Request error, wait and try again later, if problem persist contact admin",
  });
});

router.delete("/addfavorite", async (req, res) => {
  const { id, idUser } = req.query;

  let ownership = await Ownership.findOne({ where: { id: id } });

  if (ownership) {
    if (isNaN(idUser)) {
      const user = await UserAuth0.findOne({ where: { id: idUser } });
      if (user) {

        await UserAuth0Ownerships.destroy({
          where: { UserAuth0Id: idUser, OwnershipId: id },
        });
        return res.status(201).send("Favorite deleted");
      }
    } else {
      const user = await User.findOne({ where: { id: idUser } });
      if (user) {
        await UserOwnerships.destroy({
          where: { UserId: idUser, OwnershipId: id },
        });
        return res.status(201).send("Favorite deleted");
      }
    }
  }
  return res.status(500).send({
    Error:
      "Request error, wait and try again later, if problem persist contact admin",
  });
});

module.exports = router;
