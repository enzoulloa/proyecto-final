const { Router } = require("express");
const { User } = require("../db.js");
const bcrypt = require("bcryptjs");
const { getUsers } = require("../../data/userData");

const router = Router();

router.get("/", async (req, res) => {
  let users = await User.findAll({ order: ["id"] });
  res.send(users);
});

router.get('/:name', async (req,res) =>{
    const { name } = req.params
    try{let find = await User.findOne({where:{name: name}})
if(find){
   return res.status(200).send(find)
}else{
   return res.status(404).send('Error 404, not found')
}}
catch(e){console.log(e)
return res.status(500).send('Error de protocolo, mirar consola para mas detalle')}
})

router.post("/register", async (req, res) => {
  const { name, email, password, cel, photo } = req.body;
  let findName = await User.findAll({ where: { name: name } });
  let findEmail = await User.findAll({ where: { email: email } });
  try {
    if (!name || !email || !password) {
      return res
        .status(412)
        .send("Parameters name, email and password cant be null");
    } else if (findName.length || findEmail.length) {
      return res.status(409).send("User already exist");
    } else {
      let encrypted = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: encrypted,
        cel,
        photo: photo
          ? photo
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
      });
      return res.status(200).send("User created succeffully");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error: see console to fix it");
  }
});

module.exports = router;
