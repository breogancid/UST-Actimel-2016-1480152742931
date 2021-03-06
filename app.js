/*eslint-env node, pg*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

var pg = require("pg");

var credentials = {"uri":"postgre://uqhvzfad:nPuFDYCqAAnkVtXZTnO7818hw9KQgp_s@jumbo.db.elephantsql.com:5432/uqhvzfad"};
// create a new express server
var app = express();
var bodyParser = require('body-parser');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.post('/enviardatos', function (req, res) {
    var msj1=req.body.mensaje1;
    var msj2=req.body.mensaje2;

	
    var pagina='<!doctype html>mensaje enviado<html><head></head><body>';

        pagina += msj1 + msj2;

    res.send(pagina);    
    
    console.log("recibido " + msj1 + msj2);
});

app.post('/consulta',function (req, res) {
  var client = new pg.Client(credentials.uri);


    var pagina='<!doctype html> <html><head></head><body>';
    
client.connect(function(err) {
    if (err) {
      res.end("Could not connect to postgre: " + err);
      console.log("mierda");
    }
    client.query('SELECT NOW() AS "pgTime"', function(err, result) {
      if (err) {
        res.end("Error running query: " + err);
        console.log("medio bien");
      }
      res.end("PG Time: " + result.rows[0].pgTime);
              console.log("perfe illo PG Time:" + result.rows[0].pgTime);

      client.end();

      
    })
})
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
