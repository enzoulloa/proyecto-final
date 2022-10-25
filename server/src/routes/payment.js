const { Router } = require('express');
const mercadopago = require('mercadopago');
const ACCES_TOKEN = 'TEST-7893132721883360-101817-34c31b28ae790652f296a05af3cf9adf-1078900971';

mercadopago.configure({
    access_token: ACCES_TOKEN
});

const router = Router();
let paymentId = '';

router.post('/', async (req, res) => {
    const product = req.body;
    try {
        const response = await mercadopago.preferences.create(product);
        // console.log(response);
        const preferenceId = response.body.id;
        res.send({preferenceId});
    } catch (e) {
        console.log(e.message);
    };
});

router.post('/paymentId', (req, res) => {
    const body = req.body;
    try {
        console.log(body);
        paymentId = body.data.id;
        res.send('ok');
    } catch (error) {
        console.log(error);
    };
});

router.get('/paymentId', (req, res) => {
    try {
        res.send({paymentId});
    } catch (error) {
        console.log(error);
    };
});

module.exports = router;