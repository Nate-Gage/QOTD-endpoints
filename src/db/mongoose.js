const mongoose = require('mongoose')
const nconf = require('nconf')

// Read in keys and secrets. Using nconf we can set secrets via keys.json file.
nconf.argv().env().file('keys.json')

const user = nconf.get('mongoUser')
const pass = nconf.get('mongoPass')
const host = nconf.get('mongoHost')
const port = nconf.get('mongoPort')

let uri = 'mongodb:${user}:${pass}@${host}:${port}'

//and then replace your 127.0.0.1 connection value with the uri property

mongoose.connect(uri + '/quotes', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
