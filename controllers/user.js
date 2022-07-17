const connection = require('../connection/connect')

// 
var bcrypt = require('bcryptjs');
//const saltRounds = 10;

// Set JWT
const jwt = require('jsonwebtoken')
const secret = 'jong'

// ---------------> Login <--------------
module.exports.login = (req, res) => {
    const {email,password} = req.body
    var sql = "SELECT * FROM db_users WHERE email = ?";
    connection.query(sql,[email], function (err, user) {
        if (user.length == 0) { res.status(404).json({msg:'Not Found User'}); return; }
        bcrypt.compare(password, user[0].password, (err, isLogin) => {
          
            if(isLogin) {
                const token = jwt.sign({ email: user[0].email }, secret,{expiresIn: '1h'})
                res.status(200).json({msg:"Login success",status:"ok", token,})
                return;
            } else {
                res.status(400).json({msg:'Password wrong'}); 
                return;
            }
        })
    });
}

// ---------------> Register <--------------
module.exports.register = (req, res) => {
    const {email,password} = req.body
    // encrypt password
    bcrypt.genSalt(5, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if(err) { res.status(400).json({msg:err}) }
            var sql = "INSERT INTO db_users (email, password) VALUES (?,?)";
            connection.query(sql,[email,hash], function (err) {
                if (err) {
                    res.status(400).json({msg:err})
                    return;
                } 
                res.status(200).json({msg:"OK"})
                return;
            });
        });
    });
}


//
module.exports.auth = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, secret)
        res.status(200).json({status:'decoded'})
    } catch (err) {
        res.status(400).json(err.message)
    }
}