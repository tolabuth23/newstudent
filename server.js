var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
const PORT = process.env.PORT || 5000

const connection = mysql.createConnection({
  host: 'jbb8y3dri1ywovy2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'lt9fmxn1uwgmgv1q',
  password: 'yxzq80ac1f2gvn60',
  database: 'fobq86tpko3m2ruk'
});

var app = express()
app.use(cors())
app.use(express.json())

app.get('/students', function (req, res, next) {
  connection.query(
    'SELECT * FROM `studentapi`',
    function(err, results, fields) {
      res.json(results);
    }
  );
})

app.get('/students/:id', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `studentapi` WHERE `id` = ?',
    [id],
    function(err, results) {
      res.json(results);
    }
  );
})




app.post('/createStudent', function (req, res, next) {
  connection.query(
    'INSERT INTO `studentapi`(`studentId`, `studentName`, `major`, `faculty`, `mobile`, `img`) VALUES (?, ?, ?, ?, ?, ?)',
    [req.body.studentId, req.body.studentName, req.body.major, req.body.faculty, req.body.mobile, req.body.img],
    function(err, results) {
      res.json(results);
    }
  );
})

app.put('/updateStudent', function (req, res, next) {

  connection.query(
    'UPDATE `studentapi` SET `studentId`= ?, `studentName`= ?, `major`= ?, `faculty`= ?, `mobile`= ?, `img`= ? WHERE id = ?',
    [req.body.studentId, req.body.studentName, req.body.major, req.body.faculty, req.body.mobile, req.body.img, req.body.id],
    function(err, results) {
      res.json(results);
    }
  );
 
})

app.delete('/delete', function (req, res, next) {
  connection.query(
    'DELETE FROM `studentapi` WHERE id = ?',
    [req.body.id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.listen(PORT, function () {
  console.log('CORS-enabled web server listening on port '+PORT)
})