const { Router } = require("express");
const { User, Ownership } = require("../db.js");
const bcrypt = require("bcryptjs");

const router = Router();

router.post("/admin", async (req, res) => {
  const { name, email, password, cel, photo } = req.body;
  let findName = await User.findAll({ where: { name: name } });
  let findEmail = await User.findAll({ where: { email: email } });
  try {
    if (!name || !email || !password || !cel) {
      return res
        .status(412)
        .send("Parameters name, cel, email and password cant be null");
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
        role: 2,
      });
      return res.status(200).send("Usuario creado");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error: see console to fix it");
  }
});

router.put("/admin/:email", async (req, res) => {
  let emailUser = req.params.email;
  try {
    let user = await User.findOne({ where: { email: emailUser } });
    if (!user) {
      return res.status(400).send("The user does not exist");
    }
    user.update({ role: 2 });
    res.status(200).send(user);
  } catch (error) {
    console.log(e);
    return res.status(500).send("Error: see console to fix it");
  }
});

router.put("/update/:idUser", async (req, res) => {
  try {
    let idUser = req.params.idUser;
    let { name, email, cel, photo } = req.body;
    let findId = await User.findByPk(idUser);
    if (!findId) {
      return res.status(400).send({message: "The user does not exist"});
    }
    if (!name && !email && !cel && !photo) {
      return res.status(409).send({message: "Datos incompletos"})
    }
    if (name) {
      let findName = await User.findAll({ where: { name } });
      if (findName.length) {
        return res.status(409).send({message: "Name already exist"});
      }
      await findId.update({
        name,
      });
    }
    if (email) {
      let findEmail = await User.findAll({ where: { email: email } });
      if (findEmail.length) {
        return res.status(409).send({message: "Email already exist"});
      }
      await findId.update({
        email,
      });
    }
    if (cel) {
      let findCel = await User.findAll({ where: { cel: cel } });
      if (findCel.length) {
        return res.status(409).send({message: "Phone number in use"});
      }
      findId.update({ cel });
    }
    if (photo) {
      findId.update({ photo: photo[0] });
    }
    
    res.status(200).send(findId);
  } catch (e) {
    console.log(e);
    return res.status(500).send({message: "Error: see console to fix it"});
  }
});

router.put("/password/:idUser", async (req, res) => {
  try {
    let idUser = req.params.idUser;
    let {oldPw, newPw, newPwVerifier} = req.body;
    let findId = await User.findOne({where: {id: idUser}});
    if (!findId) {
      return res.status(400).send({message: "The user does not exist"});
    }
    let encryptedPassword = findId.password;
    let equal = await bcrypt.compare(oldPw, encryptedPassword);
    if (!equal) {
      return res.status(402).send({message: "Contraseña incorrecta"});
    }
    if (newPw !== newPwVerifier) {
      return res.status(402).send({message: "Contraseñas distintas"});
    }
    let encrypted = await bcrypt.hash(newPwVerifier, 10);
    findId.update({ password: encrypted });
    res.status(200).send("Contraseña actualizada");
  } catch (e) {
    console.log(e);
    return res.status(500).send({Error: e.message});
  }
});


router.put("/favorite/:id", async (req,res) =>{
  try{
    let userID = req.params.id;
    let { ownershipId } = req.body;
    let user = await User.findOne({where:{id: userID}})
    if(user){
      let newFavorite = await Ownership.findOne({where: {id: ownershipId}})
      if(newFavorite){
        await user.addOwnership(newFavorite);
        return res.status(200).json({message: 'Propiedad agregada a favoritos exitosamente'})
      }else{
        return res.status(404).json({Error: 'No se pudo encontrar la propiedad'})
      }
    } else {
      return res.status(404).json({Error: 'No se pudo encontrar al usuario'})
    }
  }
  catch(e){
    console.log(e)
    return res.status(500).json({Error: 'Fallo al intentar hacer la peticion, revisa consola para más información'})
  }
})



module.exports = router;
