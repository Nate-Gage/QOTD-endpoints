const mongoose = require('mongoose')
const validator = require('validator')

const Quote = mongoose.model('quotes', {
    body: {
        type: String,
        trim: true,
        required: true
    }, date: {
        type: Number,
        trim: true,
        required: true,
        validate(value) {
            if( value < 0 || value > 365 ) {
                throw new Error('Date must be within 1 and 365')
            }
        }
    }, 
})

module.exports = Quote