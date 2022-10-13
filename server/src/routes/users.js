const { Router } = require("express");
const { User } = require("../db.js");
const { getUsers } = require("../middlewares/userMiddleware.js");

const router = Router();

router.get('/', async (req,res)=>{
    await getUsers()
    let users = await User.findAll({order:['id']})
    return res.send(users)
})

router.get('/:id', async (req,res) =>{
    const { id } = req.params
let find = await User.findOne({where:{id: id}})
if(find){
    res.status(200).send(find)
}else{
    res.status(404).send('Error 404, not found')
}
})

router.post('/', async (req,res)=>{
const {name,email,password} = req.body
let findName = User.findAll({where: {name: name}})
let findEmail = User.findAll({where: {email: email}})
if(!name || !email || !password){
    res.status(412).send('Parameters name, email and password cant be null')
} else if(findName || findEmail){
    res.status(409).send('User already exist')
}else{
    User.create({
    name,
    email,
    password
    })
    res.status(200).send('User created succeffully')
}
})

module.exports = router;