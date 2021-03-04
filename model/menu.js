const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
    name: {type: String, required : true, unique: true },
    description: {type : String, required : true, unique : false},
    price: {type: Number, required: true, unique:  false },
    category: {type: String, required: true, unique:  false },

}, {collection: "menu"})

const model = mongoose.model('MenuSchema', MenuSchema)

module.exports = model