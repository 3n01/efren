const express = require('express');
const { endianness } = require('os');
const router = express.Router();
const path = require('path');


//Actualiza el fichero json para que se muestre otra descripción
router.post('/', (req, res, next) => {
    console.log(`body: ${JSON.stringify(req.body, null, 2)}`)
    const { es, en } = req.body;
    console.log("Recibido en express: " + es + " " + en);
    res.status(200).json({ es: es, en: en});

})


module.exports = router;