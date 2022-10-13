const { Router } = require("express");
const { Ownership } = require("../db.js");
const { getOwnerships } = require("../middlewares/ownershipsMiddleware.js");

const router = Router();

router.get('/', async (req,res)=>{
    await getOwnerships()
    let ownerships = await Ownership.findAll({order:['id']})
    return res.send(ownerships)
})

router.get('/:id', async (req,res) =>{
    const { id } = req.params
    let find = await Ownership.findOne({where:{id: id}})
    if(find){
       return res.status(200).send(find)
    }else{
        return res.status(404).send('Error 404, not found')
    }
})

router.post('/', async (req,res)=>{
    const { name,location,rooms,garage,m2,type,rating,expenses,seller,description,images,state,price,floors,review,address} = req.body
    if(!location || !rooms || !type || !price || !name || !state){
        return res.status(409).send('Error: location, rooms, type, price, name and state cant be null')
    }else{
        if(findName && type != "department"){return res.status(412).send('Error: ownership already exist')}
        else{
            Ownership.create({
                name,
                location,
                rooms,
                garage,
                m2,
                type,
                rating,
                expenses,
                seller,
                description,
                images,
                state,
                price,
                floors,
                review,
                address
            })
            return res.status(200).send('Proccess complete succeffully')
        }
    }
})

module.exports = router;