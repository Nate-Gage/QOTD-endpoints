const express = require('express')
const router = new express.Router()
const Quote = require('../qotd_models/quote')
const fs = require('fs')
const path = require('path')

var data = fs.readFileSync(path.join(__dirname, '..', 'db/keys.json'))

var keys = JSON.parse(data)

router.post('/quotes', async (req, res) => {

    const authID = keys.authID
    const quote = new Quote(req.body)

    try {

        if(req.header('authID') != authID) {
            return res.status(401).send('Authorization ID required')
        }

        await quote.save()
        res.status(201).send(quote)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/quotes', async (req, res) => {

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

router.get('/quotes/:date', async (req, res) => {
    const date = req.params.date
    console.log(req.headers)

    try {
        const quote = await Quote.find({ date })
        if (!quote) {
            return res.status(404).res.send()
        }

        res.send(quote)
    } catch (e) {
        console.log(e)
    }
})

router.patch('/quotes/:date', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['date', 'body', 'author', 'source', 'info']
    const validOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!validOperation) {
        res.status(400).send({ error: 'Invalid updates' })
    }

    const date = req.params.date

    try {
        const quote = await Quote.findOneAndUpdate({ date }, req.body, { new: true, runValidators: true })

        if (!quote) {
            res.status(404).send()
        }

        res.send(quote)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/quotes/:date', async (req, res) => {

    const authID = keys.authID    
    const date = req.params.date

    try {
        if(req.header('authID') != authID) {
            return res.status(401).send('Authorization ID required')
        }

        const quote = await Quote.findOneAndDelete({date})

        if (!quote) {
            res.status(404).send('No quote found')
        }

        res.send(quote)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/quotes/', async (req, res) => {

    const authID = keys.authID    

    try {
        if(req.header('authID') != authID) {
            return res.status(401).send('Authorization ID required')
        }

        const quote = await Quote.deleteMany({ date: { $lt: 366 }});

        if (!quote) {
            res.status(404).send('No quote found')
        }

        res.send(quote)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router