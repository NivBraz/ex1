'use strice';
var events = require('events');
// var eventConfig = require('./config').events;
var data = require("./../data/orderMovie.json");

const mongoose = require('mongoose'),
      consts = require('./consts.js');

mongoose.Promise = global.Promise;

mongoose.connect(consts.MLAB_KEY);
var conn = mongoose.connection;//get default connection

var Movie = require('./db_schema_movie.js');

class Client extends events{

    constructor(name,id){
        super();
        this.name = name;
        this.id = id;
    }   

    showOrderMovies(){
        conn.once('open',
                () => {
                    Movie.find({},
                        (err,movie) => {
                            if(err) console.log(`query error: ${err}`);
                            console.log(movie);
                            mongoose.disconnect();
                        });
                    });
    }

    showMovieById(movieId){
        let found = false;
        for(let i in data.orderMovies){
            var orderMovie = data.orderMovies[i];
            if(orderMovie.id == movieId){
                console.log(`movie found: ${orderMovie.name}`);
                found = true;
                return {"ordered movie":orderMovie};
            }
        } 
        if(!found){
            console.log("movie not found");
            return {"error" : "movie not found"};
        }

    }
    getStatusLangMovie(status,lang){
        var moviesArray = [];
        let found = false;
        for(let i in data.orderMovies){
            var orderMovie = data.orderMovies[i];
            if((orderMovie.status == status)&&(orderMovie.language == lang)){
                console.log(`movie found: ${orderMovie.name}`);
                found = true;
                moviesArray.push(orderMovie);
            }
        }
        if(!found){
            console.log("movie not found");
            return {"error" : "movie not found"};
        }
        else
            return {"ordered movies":moviesArray};
    }
};

module.exports =function (name,id){
    var newClient = new Client(name,id);
    return newClient;
}
