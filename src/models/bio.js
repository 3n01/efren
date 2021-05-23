const mongoose = require('mongoose');
const { Schema } = mongoose;

const BioSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    espanol: { type: String, required: true},
    english : { type: String, required: true}
})

module.exports = mongoose.model('Bio',BioSchema);