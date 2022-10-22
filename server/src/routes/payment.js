const { Router } = require('express');
const mercadopago = require('mercadopago');
const ACCES_TOKEN = 'TEST-7893132721883360-101817-34c31b28ae790652f296a05af3cf9adf-1078900971';

mercadopago.configure({
    access_token: ACCES_TOKEN
});

const router = Router();

let preference = {
    items: [
      {
        title: "Mi producto",
        unit_price: 100,
        quantity: 1,
      },
    ],
    back_urls: {
        success: "http://127.0.0.1:5173/",
        failure: "http://127.0.0.1:5173/sell",
        pending: "http://127.0.0.1:5173/about"
    },
    auto_return: "aproved"
};

router.post('/', async (req, res) => {
    const product = req.body;
    try {
        const response = await mercadopago.preferences.create(product);
        const preferenceId = response.body.id;
        res.send({preferenceId});
    } catch (e) {
        console.log(e.message);
    };
});

module.exports = router;