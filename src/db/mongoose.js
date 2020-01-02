const mongoose = require('mongoose')
const fs = require('fs')

// Reading the object 
var data = fs.readFileSync(__dirname + '/keys.json')

// Parsing the object
var keys = JSON.parse(data)

const user = keys.mongoUser
const pass = keys.mongoPass
const host = keys.hostName
const environment = keys.environment

if (environment == 'dev') {
    var uri = 'mongodb://127.0.0.1:27017/quotes'
} else if (environment == 'prod') {
        var uri = 'mongodb+srv://' + user + ':' + pass + host
}

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

var connection = mongoose.connection

connection.on('connected', function () {
    console.log('Connected to MongoDB')
})
