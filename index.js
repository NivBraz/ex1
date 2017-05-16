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
        var msg;
        console.log("get: show all");
        var p1 = client1.showOrderMovies()
         .then(() => {
            msg = client1.getMovies();
        })
         .catch((err) =>{
            console.log(`err ! ${msg}`);
         });
        var p2 = 1;
         Promise.all([p1,p2])
            .then(() => {res.status(200).json(msg);})
            .catch((err) => {console.error(err);});
         
        })

app.get('/getstatuslangmovie/:status/:lang',
    (req,res) => {
        console.log(`get: ${req.params.status} ${req.params.lang}`);
        res.status(200).json(client1.getStatusLangMovie(req.params.status,req.params.lang));
    });
app.post('/showMovieById/',
    (req,res) =>{
        console.log(`post: ${req.body.movieId}`);
        res.status(200).json(client1.showMovieById(req.body.movieId));
    });



app.listen(port);
console.log(`listen on port ${port}`);