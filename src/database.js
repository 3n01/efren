const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/efren2';

mongoose.connect(URI).then(
    (result) => console.log(`Success connecting to DB -> ${Object.keys(result.models)}`),
    (err) => console.log(`Error connecting to DB -> ${err}`)
)


module.exports = mongoose;