const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../db.js');

const app = express();

app.post('/', async (req, res) => {
    const { email, password } = req.body;
let userDB = await User.findOne({where: {email: email}})
if(!userDB){
    return res.status(404).json({
        ok: false,
        err: {
            message: "Account doesnt exist"
        }
    })
}else{
    let encryptedPassword = userDB.password
    let equal = await bcrypt.compare(password,encryptedPassword)
    if(!equal){
        return res.status(402).json({
            ok: false,
            err: {
                message: "Password is incorrect"
            }
        })
    }
    let token = jwt.sign({
        user: userDB,
    }, process.env.SEED_AUTENTICATION ,{
        expiresIn: process.env.TOKEN_OFF
    })
    const cOptions = {
        expiresIn: new Date(
            Date.now()+process.env.COOKIE_EXPIRES
        ),
        httpOnly: true
    }
    res.cookie('login', token, cOptions)
    return res.status(200).json({
        ok: true,
        session: token,
        photo: userDB.photo,
        name: userDB.name,
    })
}
})

app.post('/validate', async (req, res) => {
    const { password, email } = req.body;
    try{
        const userEmail = await User.findOne({where: {email: email}})
        if(!userEmail){
            return res.json({message: 'Email or password incorrect'})
        } else {
            const match = await bcrypt.compare(password, userEmail.password);
            if(match){
                return res.json({message: "Correct password"})
            } else {
                return res.json({ message: 'Email or password incorrect'})
            }
        }
    }
    catch(error){
        res.status(404).json(error)
    }
})


module.exports = app;