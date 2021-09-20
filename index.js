var Express = require ('express');
var bodyParser = require ('body-parser');

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

var cors = require('cors');
app.use(cors());

var mysql = require('mysql2');
const { query, response, request } = require('express');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6425',
    database: 'mytestdb'
})

var fileUpload = require('express-fileupload');
var fs = require('fs');
app.use(fileUpload());
app.use('/Photos', Express.static(__dirname+'/Photos'));

app.listen(49146, () => {
    connection.connect(function(err){
        if(err) throw err;
        console.log('Connect to DB');
    });
});

app.get('/', (req, res) =>{
    res.send('Hello World')
});

app.get('/Department',(req, res)=> {
    var query = `SELECT * FROM Department`;
    connection.query(query, function(err,rows,fields){
        if(err){
            response.send('failed');
        }
        response.send(rows);
    })
});
app.post('/Department',(req, res)=> {
    var query = `INSERT INTO Department
                 (DeprtmentName)
                  Value(?)`;
    var values = [
        request.body['DeprtmentName']
    ];
    connection.query(query, values,  function(err,rows,fields){
        if(err){
            response.send('failed');
        }
        response.json('Added Successfully');
    })
});
app.put('/Department',(req, res)=> {
    var query = `UPDATE Department
                 SET DeprtmentName=?  WHERE DepartmentId=?`;
                
    var values = [
        request.body['DeprtmentName'],
        request.body['DeprtmentId']
    ];
    connection.query(query, values,  function(err,rows,fields){
        if(err){
            response.send('failed');
        }
        response.json('Updated Successfully');
    })
});
app.put('/Department/:id',(req, res)=> {
    var query = `DELETE FROM Department
                 WHERE departmentId=?`;
                
    var values = [
        parseInt(request.params.id)
    ];
    connection.query(query, values,  function(err,rows,fields){
        if(err){
            response.send('failed');
        }
        response.json('Deleted Successfully');
    })
});



app.get('/employee',(req, res)=> {
    var query = `SELECT * FROM Employee`;
    connection.query(query, function(err,rows,fields){
        if(err){
            response.send('failed');
        }
        response.send(rows);
    })
});
app.post('/employee',(req, res)=> {
    var query = `INSERT INTO Employee
                 (EmployeeName,Deprtment,DataOfJoining,PhotoFileName)
                  Value(?,?,?,?)`;
    var values = [
        request.body['EmployeeName'],
        request.body['Deprtment'],
        request.body['DataOfJoining'],
        request.body['PhotoFileName']
    ];
    connection.query(query, values,  function(err,rows,fields){
        if(err){
            response.send('failed');
        }
        response.json('Added Successfully');
    })
});
app.put('/employee',(req, res)=> {
    var query = `UPDATE Employee
                 SET EmployeeName=?,
                 Deprtment=?,
                 DateOfJoining=?,
                 PhotoFileName=?,
                 WHERE EmployeetId=?`;
                
    var values = [
        request.body['EmployeeName'],
        request.body['Deprtment'],
        request.body['DateOfJoining'],
        request.body['PhotoFileName'],
        request.body['EmployeeId']

    ];
    connection.query(query, values,  function(err,rows,fields){
        if(err){
            response.send('failed');
        }
        response.json('Updated Successfully');
    })
});
app.put('/employee/:id',(req, res)=> {
    var query = `DELETE FROM Employee
                 WHERE EmployeeId=?`;
                
    var values = [
        parseInt(request.params.id)
    ];
    connection.query(query, values,  function(err,rows,fields){
        if(err){
            response.send('failed');
        }
        response.json('Deleted Successfully');
    })
});

app.post('/employee/savefile', (request, response) =>{

    fs.writeFile("./Photos/"+request.files.file.name,
    request.files.file.data, function(err){
        if(err){
            return
            console.log(err);
        }

        response.json(request.files.file.name);
    })
})