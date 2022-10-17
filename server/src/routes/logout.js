const express = require('express');
const app = express();

app.get('/', async (req,res)=>{
    let init = req.cookies;
    console.log(init);
    res.cookie('login','',{maxAge:1});
    return res.status(200).send('desconectado exitosamente');
})

module.exports = app;