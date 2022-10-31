const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, UserAuth0, Ownership} = require("../db.js");

const app = express();

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  let userDB = await User.findOne({ where: { email: email },
    include: {
      model: Ownership,
      attributes:["id",
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
        "review",
        "address"],
      through: {
          attributes: [],
      },
  }});
  if (!userDB) {
    return res.status(404).json({
      ok: false,
      err: {
        message: "Account doesnt exist",
      },
    });
  } else {
    let encryptedPassword = userDB.password;
    let equal = await bcrypt.compare(password, encryptedPassword);
    if (!equal) {
      return res.status(402).json({
        ok: false,
        err: {
          message: "Password is incorrect",
        },
      });
    }
    let token = jwt.sign({ user: userDB }, process.env.SEED_AUTENTICATION, {
      expiresIn: 60 * 60 * 24 * 7,
    });
    const cOptions = {
      expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES),
      httpOnly: true,
    };
    res.cookie("login", token, cOptions);
    return res.status(200).json({
      ok: true,
      session: token,
      photo: userDB.photo,
      name: userDB.name,
      role: userDB.role,
      userAuth0: false,
      id: userDB.id,
      favorites: userDB.Ownerships
    });
  }
});

app.post("/validate", async (req, res) => {
  const { password, email } = req.body;
  try {
    const userEmail = await User.findOne({ where: { email: email },
      include: {
        model: Ownership,
        attributes:["id",
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
          "review",
          "address"],
        through: {
            attributes: [],
        },
    } });
    if (!userEmail) {
      return res.json({ message: "Email or password incorrect" });
    } else {
      const match = await bcrypt.compare(password, userEmail.password);
      if (match) {
        return res.json({ message: "Correct password" });
      } else {
        return res.json({ message: "Email or password incorrect" });
      }
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

app.post("/auth0", async (req, res) => {
  const { email, name, photo } = req.body;

  const verification = await UserAuth0.findOne({where: {email: email}})

  if(!verification){
    const createUser = await UserAuth0.create({
      email: email,
      name: name,
      photo: photo,
    })
    const newUser = await UserAuth0.findOne({where: {email: email}})

    return res.status(201).json({
        ok: true,
        photo: newUser.photo,
        name: newUser.name,
        role: newUser.role,
        userAuth0: true,
        id: newUser.id,
        favorites: newUser.Ownerships? newUser.Ownerships : []
      });

  }else{
    return res.status(201).json({
      ok: true,
      photo: verification.photo,
      name: verification.name,
      role: verification.role,
      userAuth0: true,
      id: verification.id,
      favorites: verification.Ownerships ? verification.Ownerships : []
    });
  }

});
module.exports = app;
