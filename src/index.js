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

//Routes
app.use('/api/images',require('./routes/image.routes'))

//Static files
console.log( path.join(__dirname ,'public'))
app.use(express.static(path.join(__dirname ,'public')))

//Starting the server

app.listen(app.get('port'), () => {
    console.log(`Escuchando por ${app.get('port')}`)
})