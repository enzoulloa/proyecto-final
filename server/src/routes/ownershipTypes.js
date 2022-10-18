const { Router } = require("express");
const router = Router();

router.get('/', async (req, res) => {
    let types = ['Casa','PH','Departamento','Duplex','Terreno','Cochera']
    return res.status(200).send(types)
    })
    
    module.exports = router;
