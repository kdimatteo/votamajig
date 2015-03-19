var express = require('express');
var bodyParser = require('body-parser');
//var path = require('path');

var app = express();

//app.configure(function(){
    app.use(bodyParser());
    app.use(express.static(__dirname));
    //app.use(express.static(path.join(__dirname, 'dist')));
//});

var port = process.env.PORT || 5000;

app.listen(port);

console.log('server started '+port);