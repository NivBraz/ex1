var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    movieSchema = new schema({
        id: {type:Number, index:1, required:true, unique:true},
        name: {type:String, required:true},
        category: {type:String, required:true},
        director: {type:String, required:true},
        language: {type:String, required:true},
        status: {type:String, required:true},
        actors: [String]
    }, {collection: 'movies'});

var Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;