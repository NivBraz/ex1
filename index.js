const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      port = process.env.PORT || 3000;
var customerService = require("./customer_service/orderCancelWS.js");
var client1 =  customerService("Nivo",224);

app.use('/assets', express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.all('*', (req,res,next) =>{
    console.log("welcome client");
    next();
});

app.get('/showOrderMovies',
    (req,res) => {
        res.status(200).json(client1.showOrderMovies());
    });

app.get('/getstatuslangmovie/:status/:lang',
    (req,res) => {
        console.log(`get: ${req.params.status} ${req.params.lang}`);
        res.json(client1.getStatusLangMovie(req.params.status,req.params.lang));
    });
app.post('/showMovieById/',
    (req,res) =>{
        var movieId = req.body.movieId;
        console.log(`post: ${req.body.movieId}`);
        res.json(client1.showMovieById(movieId));
    });

// app.get('/', function (req, res) {
//     res.json({page:'home'});
// })


app.listen(port);
console.log(`listen on port ${port}`);