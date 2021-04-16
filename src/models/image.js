const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema({
    name : { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: false},
    sort: { type: Number, required: false}
});




module.exports = mongoose.model('Image', ImageSchema);