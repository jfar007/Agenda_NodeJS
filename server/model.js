const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  _id: { type: String, required: true, unique: true},
  usuario: { type: String, required: true },
  contrasena: { type: String, required: true}
})

let UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel
