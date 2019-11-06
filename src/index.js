const express = require('express')
require('./db/mongoose')
const Quote = require('./qotd_models/quote')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.post('/quotes', async (req, res) => {
    const quote = new Quote(req.body)

    try {
        await quote.save()
        res.status(201).send(quote)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/quotes', async (req, res) => {

    try {
        const quotes = await Quote.find({})

        if (!quotes) {
            res.status(400).res.send()
        }

        res.send(quotes)
    } catch (e) {
        console.log(e)
    }
})

app.get('/quotes/:date', async (req, res) => {
    const date = req.params.date
    
    try {
        const quote = await Quote.find({date})
        if (!quote) {
            return res.status(404).res.send()
        }

        res.send(quote)
    } catch (e) {
        console.log(e)
    }
})


app.listen(port, () => {
    console.log('Server is up on Port ' + port)
})