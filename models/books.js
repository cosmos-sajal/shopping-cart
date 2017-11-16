var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	title : String,
	description : String,
	images : String,
	price : Number
});

var Books = mongoose.model('Books', bookSchema);

module.exports = Books;
