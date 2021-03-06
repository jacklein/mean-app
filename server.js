/**
 * Created by jackklein on 6/13/16.
 */

// BASE SETUP
// =============================
// CALL THE PACKAGES ----------------------------
var express     = require('express');
var app         = express(); // define our app using express
var bodyParser  = require('body-parser'); // get body-parser
var morgan      = require('morgan') // used to see requests
var mongoose    = require('mongoose'); // for working w/ our DB
var config      = require('./config');
var path        = require('path');


// APP CONFIGURATION ============================
// ==============================================
// use body parser so we can grab info from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,\
                                                    Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database (local)
mongoose.connect(config.database);

// set static files location
// used for requests that our frontent would make
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API ===========================
// ==============================================

// API ROUTES -----------------------------------
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE --------------------------
// SEND USERS TO FRONTEND
// has to be registered after API ROUTES
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START THE SERVER =============================
// ==============================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);











