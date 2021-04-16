const express = require('express');
const router = express.Router();
const Image = require('../models/image')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 100
    }
}); 

//get images
router.get('/', async(req, res, next) => {
    Image.find()
        .exec()
        .then(
            result => res.status(200).json({ result: result}),
            err => { err.reason ="Not found"; res.status(404).json({ result: err})}
        )
})

router.get('/img/:id', (req, res, next) => {
    const id = req.params.id;
    Image.findById(id)
        .exec()
        .then(data => res.status(200).download(data.image));
    
})

//get by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Image.findById(id)
        .exec()
        .then(
            result => res.status(200).json({ result: result}),
            err => { err.reason = "Not found"; res.status(404).json({ result: err})}
        )
});

//insert images
router.post('/', upload.single('image'), async(req, res, next) => {
    console.log("File: ", req.file);
    console.log("Body: ", req.body);
    const { name, description} = req.body;
    const image = req.file.path;
    const data = new Image({ name, description, image});
    const insercion = await data.save();
    res.status(200).json({
        doc : insercion._doc,
        errors: insercion.errors
    })

})


//updte images
router.put('/:id', async(req, res, next) => {
    const { name, description } = req.body;
    const data = { name, description};
    const id = req.params.id;
    const update = await Image.findByIdAndUpdate(id, data);

    if (update.errors == null){
        res.status(200).json({
            result : update
        })
    }
})

//borrar
router.delete('/:id', async(req, res, next) => {
    const id = req.params.id;
    const remove = await Image.findByIdAndRemove(id);
    if (remove == null){
        res.status(500).json({
            error: "No ha sido posible borrar el registro"
        })
    }else {
        res.status(200).json({
            result: "Se borró OK"
        })
    }
    
})

module.exports = router;