const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName : {type: String, required : true, unique: false },
    employeeID : {type : Number, required : true, unique : true},
    password : {type: String, required: true, unique:  false },

}, {collection: "accounts"},)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model