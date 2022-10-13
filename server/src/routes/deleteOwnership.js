const { Router } = require("express");
const { Ownership } = require("../db.js");

const router = Router();

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    let ownershipFind = Ownership.findOne({where: {id: id}})
    if(ownershipFind){
        await Ownership.destroy({
            where: { id: id },
        });
        res.status(200).send({ message: 'Deleting ownership' });
    } else {
        res.status(404).send({ message: 'Error 412: cant delete ownership' });
    }
});

module.exports = router;