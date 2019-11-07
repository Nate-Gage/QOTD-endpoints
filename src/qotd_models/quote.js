const mongoose = require('mongoose')
const validator = require('validator')

const Quote = mongoose.model('quotes', {
    date: {
        type: Number,
        trim: true,
        required: true,
        validate(value) {
            if (value < 0 || value > 365) {
                throw new Error('Date must be within 1 and 365')
            }
        }
    }, body: {
        type: String,
        trim: true,
        required: true
    }, author: {
        type: String,
        trim: true
    }, source: {
        type: String,
        trim: true
    }, info: {
        type: String,
        trim: true
    }
})

module.exports = Quote