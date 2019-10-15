const mongoose = require('mongoose')
const Schema = mongoose.Schema

let EventsSchema = new Schema({
	// _id: { type: Object, required: false },
	user_id: { type: String, required: true },
	title : { type: String, required: true },
	start : { type: Date, required: true},
	end : { type: Date, required: false},
	all_day : { type: Boolean, required: true}
})

let EventsModel = mongoose.model('eventos', EventsSchema)

module.exports = EventsModel
