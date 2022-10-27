const { Router } = require('express');
const mercadopago = require('mercadopago');
const { Sales, Ownership } = require('../db.js')

const ACCES_TOKEN = 'TEST-7893132721883360-101817-34c31b28ae790652f296a05af3cf9adf-1078900971';

mercadopago.configure({
    access_token: ACCES_TOKEN
});

const router = Router();
// let paymentId = '';

router.post('/', async (req, res) => {
    const product = req.body;
    try {
        const response = await mercadopago.preferences.create(product);
        // console.log(response);
        const productId = response.body.id;
        res.send({productId});
    } catch (e) {
        console.log(e.message);
    };
});

router.post('/paymentId/:id', async (req, res) => {
    const body = req.body;
    const ownershipId = req.params.id;
    try {
        console.log(body);
        if(body.data){
            let paymentId = body.data.id;
            const ownership = await Ownership.findOne({where: {id: ownershipId}});
            const newSale = await ownership.createSales({
                name: 'Pending...',
                paymentId,
                state: 'pending',
                state_detail: 'pending'
            });
            return res.send('Ok, me estás pasando la data, seguí asi...');
        };
        return res.status(400).send('No me estás pasando la data...');
    } catch (error) {
        console.log(error);
    };
});

router.get('/paymentId', async (req, res) => {
    const ownershipId = req.body.id;
    try {
        const response = await Ownership.findOne({
            where: {id: ownershipId},
            includes: {
                model: Sales
            }
        });
        console.log(response);
        res.send(response);
    } catch (error) {
        console.log(error);
    };
});

module.exports = router;