var Express = require ('express');
var bodyParser = require ('body-parser');

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

var cors = require('cors');
app.use(cors());

var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6425',
    database: 'mytestdb'
})

app.listen(49146, () => {
    connection.connect(function(err){
        if(err) throw err;
        console.log('Connect to DB');
    });
});

app.get('/', (req, res) =>{
    res.send('Hello World')
});