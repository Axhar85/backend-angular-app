var Express = require ('express');
var bodyParser = require ('body-parser');

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.listen(49146, () => {

});

app.get('/', (req, res) =>{
    res.send('Hello World')
});