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
router.post('/', upload.single('image'), (req, res, next) => {
    //console.log("File: ", req.file);
    //console.log("Body: ", req.body);
    const { name, description} = req.body;
    const image = req.file.path;


    //obtener el sort mayor existe, si cero, cero
    Image.find().select({sort: 1, _id: 0}).sort({sort: -1}).limit(1).then(
        mayor => {
            let sort = mayor.length === 0 ? 0 : mayor[0].sort + 1;
            const data = new Image({ name, description, image, sort});
            data.save().then(
                result => {
                    res.status(200).json({
                        result : result
                    })
                }
            )
            
        },
        err => console.log(err)
    );

    


})


//updte images
router.put('/:id', async(req, res, next) => {
    const { name, description , sort, accion} = req.body;
    console.log(`Accion -> ${accion} Actual sort: ${sort}` )
    const data = { name, description};
    const id = req.params.id;

    if (accion !== undefined){
        let futuroMio = sort + accion 
        console.log(`futuroMio -> ${futuroMio}`)
        Image.find({ sort: futuroMio}).then(
            result => {
                console.log("Result:" , result);
                if (result.length !== 0){
                    let finalData = {
                        sort: sort
                    }
                    console.log(JSON.stringify(finalData, null, 2));
                    Image.findByIdAndUpdate(result[0]._id, finalData).then(
                        result => {
                            let nuevosDatos = {
                                sort: futuroMio
                            }
                            Image.findByIdAndUpdate(id, nuevosDatos).then(
                                result => console.log("Actualizacion interna"),
                                err => console.log("Error interno: ", err)
                            )
                        },
                        erro => console.log("Error al actualizar", erro)
                    )
                }
            },
            err => console.log(err)
        )
    }else {
        Image.findByIdAndUpdate(id, data).then(
            res => console.log(res),
            err => console.log(err)
        )

        res.status(200).json({});
    }
    
    
    
    
    

    
})



//borrar
router.delete('/:id', async(req, res, next) => {
    const id = req.params.id;
    console.log("delete 001")
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