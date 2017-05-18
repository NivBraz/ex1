'use strice';
var events = require('events');
// var eventConfig = require('./config').events;
var data = require("./../data/orderMovie.json");

const mongoose = require('mongoose'),
       consts = require('./consts.js');

mongoose.Promise = global.Promise;

class Client extends events{


    constructor(name,id){
        super();
        this.name = name;
        this.id = id;
    }   

    showOrderMovies(callback){
        mongoose.connect(consts.MLAB_KEY);
        var conn = mongoose.connection;
        var Movie = require('./db_schema_movie.js');
        conn.on('error',
            (err) => {
                console.log(`connection error: ${err}`);
        });
        conn.once('open',
                () => {
                    Movie.find({},
                        (err,movie) => {
                            if (err){
                                console.log(`error: ${err}`);
                                mongoose.disconnect();
                                return callback({"error":err});
                            }
                            else {
                                if(movie.length<1){
                                    console.log("error:movie not found");
                                    mongoose.disconnect();
                                    callback ({"error":"movie not found"});
                                }
                                else{
                                    console.log(movie);
                                    mongoose.disconnect();
                                    callback(null, movie); 
                                } 
                            }  
                        });
                    });
    }

    showMovieById(movieId,callback){
        mongoose.connect(consts.MLAB_KEY);
        var conn = mongoose.connection;
        var Movie = require('./db_schema_movie.js');
        conn.on('error',
            (err) => {
                console.log(`connection error: ${err}`);
        });
        conn.once('open',
                () => {
                    Movie.find({id:movieId},
                        (err,movie) => {
                            if (err){
                                console.log(`error: ${err}`);
                                mongoose.disconnect();
                                return callback({"error":err});
                            }
                            else {
                                if(movie.length<1){
                                    console.log("error:movie not found");
                                    mongoose.disconnect();
                                    callback ({"error":"movie not found"});
                                }
                                else{
                                    console.log(movie);
                                    mongoose.disconnect();
                                    callback(null, movie); 
                                } 
                            }   
                        });
                    });
    }
    getStatusLangMovie(_status,lang,callback){
        mongoose.connect(consts.MLAB_KEY);
        var conn = mongoose.connection;
        var Movie = require('./db_schema_movie.js');
        conn.on('error',
            (err) => {
                console.log(`connection error: ${err}`);
        });
        conn.once('open',
                () => {
                    Movie.find({language:lang,status:_status},
                        (err,movie) => {
                            if (err){
                                console.log(`error: ${err}`);
                                mongoose.disconnect();
                                return callback({"error":err});
                            }
                            else {
                                if(movie.length<1){
                                    console.log("error:movie not found");
                                    mongoose.disconnect();
                                    callback ({"error":"movie not found"});
                                }
                                else{
                                    console.log(movie);
                                    mongoose.disconnect();
                                    callback(null, movie); 
                                }
                            }   
                        });
                    });
    }
};

module.exports =function (name,id){
    var newClient = new Client(name,id);
    return newClient;
}
