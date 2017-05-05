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

app.get('/',
    (req,res) => {
        res.status(200).send(`<h1>welcome to cancel order movie</h1>
                            <p>for showing all the order movie please enter:<br>
                              <a href="https://peaceful-waters-26893.herokuapp.com/showordermovies">https://peaceful-waters-26893.herokuapp.com/showordermovies</a></p>
                            <p>for looking a specific movie by id (http verb:post) enter<br>
                              <a href="https://peaceful-waters-26893.herokuapp.com/showMovieById/">https://peaceful-waters-26893.herokuapp.com/showMovieById/</a><br>
                            and send in body under 'movieId' the require id number.</p>
                            <p>for searching a movie by his language and status(order, watched) enter:<br>
                             <a href="https://peaceful-waters-26893.herokuapp.com/getstatuslangmovie/watched/Italian">https://peaceful-waters-26893.herokuapp.com/getstatuslangmovie/watched/Italian</a></p>

          `);
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



app.listen(port);
console.log(`listen on port ${port}`);