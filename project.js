var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var project = require('./exportproject');

app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');
 mongoose.connect('mongodb://127.0.0.1/myschoolproject');


app.use('/',project);



var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })