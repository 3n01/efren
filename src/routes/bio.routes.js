const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Bio = require('../models/bio');


router.get('/', (req, res, next) => {
    Bio.find({}).then(
        result => res.status(200).json(result),
        err => res.status(400).json(err)
    )
})

router.post('/', (req, res, next) => {
    const { espanol, english } = req.body;
    console.log("Recibido en express: " + espanol + " " + english);
    const _id = new mongoose.Types.ObjectId();
    const data = new Bio({_id, espanol, english});

    Bio.remove({}).then(
        success => {
            data.save()
            .then(
                result => res.status(200).json({ borrado: success, insercion: 'OK', espanol: espanol, english: english}),
                err => console.log(err)
            )
        },
        fail => console.log(fail)
    )


})


module.exports = router;