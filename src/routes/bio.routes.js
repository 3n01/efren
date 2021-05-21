const express = require('express');
const router = express.Router();
const path = require('path');


//Actualiza el fichero json para que se muestre otra descripción
router.post('/', (req, res) => {
    const { es, en } = req.body;
    res.status(200).json({});

})