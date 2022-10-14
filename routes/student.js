const router = require('express').Router();

const mysql =require('mysql2');
const db = mysql.createConnection({
    host: 'jbb8y3dri1ywovy2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      port: '3306',
      user: 'lt9fmxn1uwgmgv1q',
      password: 'yxzq80ac1f2gvn60',
      database: 'fobq86tpko3m2ruk'
    });
    
//create 
router.post("/create", function(req,res){
    db.query(
        'INSERT INTO `studentapi`(`studentId`, `studentName`, `major`, `faculty`, `mobile`, `img`) VALUES (?, ?, ?, ?, ?, ?)',
        [req.body.studentId, req.body.studentName, req.body.major, req.body.faculty, req.body.mobile, req.body.img],
        function(err, results){
            res.json(results);
        }
    )
});

//get 
router.get("/", function(req, res){
    db.query(
    'SELECT * FROM `studentapi`',
    function(err, results, fields) {
      res.json(results);
    }
    )
})

//update 
router.put("/update", function(req,res){
            db.query(
                'UPDATE `studentapi` SET `studentId`= ?, `studentName`= ?, `major`= ?, `faculty`= ?, `mobile`= ?, `img`=? WHERE id = ?',
                [req.body.studentId, req.body.studentName, req.body.major, req.body.faculty, req.body.mobile, req.body.img, req.body.id],
                function(err, results) {
                  res.json(results);
                }
              );
          
       
    }
   
);

//delete
router.delete('/delete/:id', function (req, res, next) {
    if (req.body.stdId == req.params.id) {
        try {
            db.query(
                'DELETE FROM `studentapi` WHERE id = ?',
                [req.params.id],
                function(err, results) {
                  res.json("Delete is success fully");
                }
              );
             
        } catch (error) {
            res.status(500).json(error);
        }
    }
  })
  

module.exports = router;