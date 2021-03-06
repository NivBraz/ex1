const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      port = process.env.PORT || 3000;
var customerService = require("./customer_service/orderCancelWS.js");
var client1 =  customerService("Nivo",224);

app.use('/assets', express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all('*', (req,res,next) =>{
    console.log("welcome client");
    next();
});

app.get('/',
    (req,res) => {
        res.sendFile(`${__dirname}/index.html`);
    });

app.get('/showOrderMovies',
    (req,res) => {
        console.log("get: show all");
        client1.showOrderMovies((err,movies) =>{
            if(err) res.status(200).json(err);
            else res.status(200).json(movies);
        });
    });

app.get('/getstatuslangmovie/:status/:lang',
    (req,res) => {
        console.log(`get: ${req.params.status} ${req.params.lang}`);
        client1.getStatusLangMovie(req.params.status,req.params.lang,(err,movie) =>{
            if(err) res.status(200).json(err);
            else res.status(200).json(movie);
        });
    });
app.post('/showMovieById/',
    (req,res) =>{
        console.log(`post: ${req.body.movieId}`);
        client1.showMovieById(req.body.movieId,(err,movie) =>{
            if(err) res.status(200).json(err);
            else res.status(200).json(movie);
        });
    });



app.listen(port);
console.log(`listen on port ${port}`);