const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const News = require('../models/news');


router.get('/', async(req, res, next) => {
    News.find({})
        .exec()
        .then(
            result => res.status(200).json({ result: result}),
            err => console.log(err)
        );
})

router.get('/:id', async(req, res, next) => {
    News.findById(req.params.id)
        .exec()
        .then(
            result => res.status(200).json({ result: result}),
            err => console.log(err)
        );
});

router.post('/', (req, res, next) => {
    console.log(`body: ${JSON.stringify(req.body, null, 2)}`)
    const { name, date, description, link } = req.body;

    const _id = new mongoose.Types.ObjectId();
    const data = new News({ _id, name, date, description, link});  
    data.save()
        .then(
            result => {
                res.status(200).json({
                    result: result
                })
            },
            err => console.log(err)
        )

})

router.put('/:id', (req, res, next) => {
    const { name, date, description, link } = req.body;
    const update = { name, date, description, link};
    News.findByIdAndUpdate(req.params.id, update)
        .then(
            result => res.status(200).json({ result: result}),
            err => console.log(err)
        )
})

router.delete('/:id', async(req, res, next) => {
    News.findByIdAndRemove(req.params.id)
        .then(
            result => {
                res.status(200).json( {result: result})
            },
            err => console.log(err)
        )
})

module.exports = router;