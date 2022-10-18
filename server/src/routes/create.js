const { Router } = require("express");
const { User } = require("../db.js");
const bcrypt = require('bcryptjs');

const router = Router();

router.post('/admin', async (req,res)=>{
    const {name,email,password,cel,photo} = req.body
    let findName = await User.findAll({where: {name: name}})
    let findEmail = await User.findAll({where: {email: email}})
    try {
        if (!name || !email || !password) {
            return res.status(412).send('Parameters name, email and password cant be null')
        } else if(findName.length || findEmail.length){
            return res.status(409).send('User already exist')
        }else{
            let encrypted = await bcrypt.hash(password, 10)
            let userCreate = await User.create({
                name,
                email,
                password: encrypted,
                cel,
                photo: photo ? photo : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg',
            })
            let admin = await userCreate.update({role: 3})
            return res.status(200).send(admin)
        }}
        catch(e){
            console.log(e)
            return res.status(500).send('Error: see console to fix it')
        }
    }   
);

router.put("/admin/:id", async (req, res) => {
    let idUser = req.params.id;
    try {
        let user = await findByPk(idUser)
        if (!user) {
            return res.status(400).send('The user does not exist')
        }
        user.update({ role: 3 })
        
    } catch (error) {
        console.log(e)
        return res.status(500).send('Error: see console to fix it')
    }
})

router.put("/update/:idUser", async (req, res) => {
    try {
        let idUser = req.params.idUser;
        let { name, email, password, cel, photo } = req.body
        let findId = await User.findByPk(idUser)
        if (!findId) {
            return res.status(400).send('The user does not exist')
        }
        if(name){
            let findName = await User.findAll({ where: { name } })
            if (findName.length) {
                return res.status(409).send('Name already exist')
            }
            await findId.update({
                name
            })
        }
        if (email) {
            let findEmail = await User.findAll({ where: { email: email } })
            if (findEmail.length) {
                return res.status(409).send('Email already exist')
            }
            await findId.update({
                email
            })
        }
        if (password) {
            let encrypted = await bcrypt.hash(password, 10)
            findId.update({password: encrypted})
        }
        if (cel) {
            let findCel = await User.findAll({ where: { cel: cel } })
            if (findCel.length) {
                return res.status(409).send('Phone number in use')
            }
            findId.update({cel})
        }
        if (photo) {
            findId.update({photo})
        }
        res.status(200).send(findId)
    } catch (e) {
        console.log(e)
        return res.status(500).send('Error: see console to fix it')
    }
});


module.exports = router;