const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true},
    description: { type: String, required: true},
    m1: { type: Number, required: true},
    m2: { type: Number, required: true},
    year: { type: Number, required: true},
    image: { type: String, required: false},
    url : {type: String , required: false},
    sort: { type: Number, required: false},
    tab: { type: Number, required: true}
});




module.exports = mongoose.model('Image', ImageSchema);