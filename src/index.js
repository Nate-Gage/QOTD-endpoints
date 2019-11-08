const express = require('express')
require('./db/mongoose')
const quotesRouter = require('./routers/quotes')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(quotesRouter)

app.listen(port, () => {
    console.log('Server is up on Port ' + port)
})