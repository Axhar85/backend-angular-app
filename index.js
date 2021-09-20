var Express = require ('express');
var bodyParser = require ('body-parser');

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))