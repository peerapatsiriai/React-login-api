const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())

// Set Post Method
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended:true
}));

// Set All route
const Routes = require('./routes/routes')
app.use('/api',Routes)

// Set Connect Database
const connection = require('./connection/connect')
connection.connect(function(err) {
    if (err) console.log(err);
    console.log("Database Connected!");
});

app.get('/hello',(req,res) => {
    res.send('Welcom to my API')
})

app.get('/',(req,res) => {
    res.send('Welcom to my API')
})

// Set Port server
app.listen(3000,(err) => {
    if(err) console.log(err);
    console.log('Server run on port: 3000');
})