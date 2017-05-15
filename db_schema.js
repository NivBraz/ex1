var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    userSchema = new schema({
        clientId: {type:Number, index:1, required:true, unique:true},
        name: {type:String, required:true},
        orderMovies: [String]
    }, {collection: 'users'});

var User = mongoose.model('user', userSchema);

module.exports = User;