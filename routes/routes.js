const { response } = require('express')
const express = require('express')
const app = express.Router()


const user = require('../controllers/user')
app.get('/',(req,res) => {
    res.send('Welcom to my API')
})
app.post('/login',user.login)
app.post('/register',user.register)
app.post('/auth',user.auth)

module.exports = app