const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

    const personSchema = new mongoose.Schema({
        name: {
            type: String,
            minLength: 3,
            required: true},
        number: {
            type: String,
            validate: {
                validator: (number) => {
                    //Number must be 2 or 3 digits followed by a dash and then 5 or more digits.
                    // ex. 023-51351 or 15-151235123
                    return /^\d{2,3}-\d{5,}$/.test(number)
                }
            }},
    })

    personSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

    module.exports = mongoose.model('Person', personSchema)