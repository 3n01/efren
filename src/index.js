const express = require("express");
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = 3032;
const directory = path.join(__dirname, '/uploads');

const {mongoose} = require('./database');

//Settings
app.set('port', process.env.PORT || PORT);


//Middleware (se ejecutan antes de llegar a las rutas)
app.use('/uploads', express.static(directory));
app.use(morgan('dev'))
app.use(express.json())

app.use((req,res,next)=>{
    // res.header("Content-Security-Policy", "default-src 'self';");
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT')
        return res.status(200).json({})
    }
    next()
})

//Routes
app.use('/api/images',require('./routes/image.routes'))


//Fix noticias
app.get('/noticias', (req, res) => {    
    res.sendFile(path.join(path.join(__dirname ,'public'), 'index.html')), function(err) {             
    if (err) {                 
         res.status(500).send(err) 
         }        
    };
});

//Static files
console.log( path.join(__dirname ,'public'))
app.use(express.static(path.join(__dirname ,'public')))

//Starting the server

app.listen(app.get('port'), () => {
    console.log(`Escuchando por ${app.get('port')}`)
})