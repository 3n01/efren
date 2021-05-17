const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewsSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String , required: false},
    date: { type: String , required: false},
    description: { type: String , required: false},
    link: { type: String , required: false},
});

module.exports = mongoose.model('News', NewsSchema);