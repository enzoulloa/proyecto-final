const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, UserAuth0 } = require("../db.js");

const app = express();

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  let userDB = await User.findOne({ where: { email: email } });
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
    });
  }
});

app.post("/validate", async (req, res) => {
  const { password, email } = req.body;
  try {
    const userEmail = await User.findOne({ where: { email: email } });
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
  let userAuth0 = { email: email, name: name, photo: photo };
  const validate = User.findOne({ where: { email: email } });
  if (!validate) {
    const exist = UserAuth0.findOne({ where: { email: email } });
    if (!exist) {
      UserAuth0.create({
        email,
        name,
        photo: photo
          ? photo
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
      });
    }
    return res
      .status(200)
      .send({ role: 1, name: name, photo: photo, userAuth0: true });
  } else {
    let token = jwt.sign(
      {
        user: userAuth0,
      },
      process.env.SEED_AUTENTICATION,
      {
        expiresIn: 60 * 60 * 24 * 7,
      }
    );
    const cOptions = {
      expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES),
      httpOnly: true,
    };
    res.cookie("loginAuth0", token, cOptions);
    return res.status(200).json({
      ok: true,
      session: token,
      photo: userAuth0.photo,
      name: userAuth0.name,
      role: 1,
      userAuth0: true,
    });
  }
});

module.exports = app;
