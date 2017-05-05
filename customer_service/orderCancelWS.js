'use strice';
var events = require('events');
// var eventConfig = require('./config').events;
var data = require("./../data/orderMovie.json");

class Client extends events{

    constructor(name,id){
        super();
        this.name = name;
        this.id = id;
    }

    showOrderMovies(){
        return {"orderd movies" : data.orderMovies};
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
        let found = false;
        for(let i in data.orderMovies){
            var orderMovie = data.orderMovies[i];
            if((orderMovie.status == status)&&(orderMovie.language == lang)){
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
};

module.exports =function (name,id){
    var newClient = new Client(name,id);
    return newClient;
}
