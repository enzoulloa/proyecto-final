const express = require('express');
const router = express.Router();
const { Review, User, Ownership } = require('../db.js')

router.get('/', async (req, res) => {
    try {
        const allReview = await Review.findAll({
            attributes: ['id', 'stars', 'message', 'date'],
            include:{
                model: User,
                attributes: ['name', 'photo', 'id'],
                model: Ownership,
                attributes: ['name', 'id']
            }
        })
        return res.status(200).send(allReview)
    } catch(e){
        console.log(e)
        return res.status(404).send('Review not found')
    }
})

router.post('/', async (req, res) => {
    const { stars, message, userId, ownershipId } = req.body;
    try{
        const newReview = await Review.create({
            message,
            stars,
        })
        const findUser = await User.findOne({where: {id: userId}})
        const findOwnership = await Ownership.findOne({where:{id: ownershipId}})
        await newReview.addUser(findUser)
        await newReview.addOwnership(findOwnership)
        return res.status(200).send('Review created successfully')
    }
    catch(e){
        console.log(e)
        return res.status(410).send({error: 'Cant create review, see console for more details'})
    }
})

module.exports = router;