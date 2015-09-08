var express = require("express");
var mongoose = require("mongoose");
var bodyParser  = require("body-parser");

var staticPath = __dirname + "/static";

var app = express();
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//var MONGOHQ_URL = "mongodb://localhost";
//mongoose.connect(process.env.MONGOHQ_URL);

var server = app.listen(process.env.PORT || 5000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at http://%s:%s from %s", host, port, staticPath);
});