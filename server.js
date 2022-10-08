var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
const PORT = process.env.PORT || 5000

const connection = mysql.createConnection({
  host: 'cwe1u6tjijexv3r6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'ddszfg0uw77d7uy9',
  password: 'n4p2jkqkised7u0s',
  database: 'tkp8ni8hf8xktds7'
});

var app = express()
app.use(cors())
app.use(express.json())

app.get('/users', function (req, res, next) {
  connection.query(
    'SELECT * FROM `users`',
    function(err, results, fields) {
      res.json(results);
    }
  );
})

app.get('/users/:id', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `users` WHERE `id` = ?',
    [id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.post('/users', function (req, res, next) {
  connection.query(
    'INSERT INTO `users`(`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?, ?, ?, ?, ?)',
    [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar],
    function(err, results) {
      res.json(results);
    }
  );
})

app.put('/users', function (req, res, next) {
  connection.query(
    'UPDATE `users` SET `fname`= ?, `lname`= ?, `username`= ?, `password`= ?, `avatar`= ? WHERE id = ?',
    [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar, req.body.id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.delete('/users', function (req, res, next) {
  connection.query(
    'DELETE FROM `users` WHERE id = ?',
    [req.body.id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.listen(PORT, function () {
  console.log('CORS-enabled web server listening on port '+PORT)
})