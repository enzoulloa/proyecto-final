const { Router } = require("express");
const { User, UserAuth0, Ownership, UserOwnerships, UserAuth0Ownerships } = require("../db.js");
const bcrypt = require("bcryptjs");
const { getUsers } = require("../../data/userData");

const router = Router();

router.get("/", async (req, res) => {
  let users = await User.findAll({ order: ["id"],
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
  let usersAuth0 = await UserAuth0.findAll({ order: ["id"],
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
  const allUsers = [...users, ...usersAuth0]
  res.send(allUsers);
});

router.get('/:name', async (req,res) =>{
    const { name } = req.params
    try{
      let find = await User.findOne({where:{name: name},
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
}})
      let findAuth0= await UserAuth0.findOne({where:{name: name},
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
}})

if(find){
   return res.status(200).send(find)
}else if(findAuth0){
  return res.status(200).send(findAuth0)
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

router.put('/addfavorite', async (req,res)=>{
  const {id, idUser} = req.body

  let ownership = await Ownership.findOne({where:{id: id}})
  let find = await User.findOne({where:{id: idUser}})
  let findAuth0= await UserAuth0.findOne({where:{id: idUser}})

  if(ownership){
    if(find){
      const user =   await User.findOne({
        where:{id: idUser},
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
      }
      })
      await user.addOwnership(ownership)
      return res.status(201).send("Added to favotire")
    } 
    if(findAuth0){
      const user =   await UserAuth0.findOne({
        where:{id: idUser},
        include: {
          model: Ownership,
          attributes:["id",
            "name",
            "location",
            "rooms",
            "garage",
            "m2",
            "type",
            "expenses",+
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
      }
      })
      await user.addOwnership(ownership)
      return res.status(201).send("Added to favotire")
    }
  }
  return res.status(500).send({Error: 'Request error, wait and try again later, if problem persist contact admin'})
})

router.delete('/addfavorite',async(req, res)=>{
  const {id, idUser} = req.query

  let ownership = await Ownership.findOne({where:{id: id}})
  let find = await User.findOne({where:{id: idUser}})
  let findAuth0= await UserAuth0.findOne({where:{id: idUser}})

  if(ownership){
    if(find){
      await UserOwnerships.destroy({where: {UserId: idUser, OwnershipId: id}}) 
      return res.status(201).send('Favorite deleted')
    } 
    if(findAuth0){
      await UserAuth0Ownerships.destroy({where: {UserId: idUser, OwnershipId: id}}) 
      return res.status(201).send('Favorite deleted')
    } 
    
    
  }
  
  return res.status(500).send({Error: 'Request error, wait and try again later, if problem persist contact admin'})
})

module.exports = router;
