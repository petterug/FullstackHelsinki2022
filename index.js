require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { off } = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('body', (request, response) => {return JSON.stringify(request.body)})

const errorHandler = (error, request, response, next) => {
    console.error('hello',error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(morgan(':method :url :response-time :body'))
app.use(errorHandler)

app.get('/', (request, response) => {
    response.send('<h1>Landing page lol</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    console.log(request.params.id)
    Person.findById(request.params.id).then( person => {
        if(person) {
            response.json(person)
        } else {            
            console.log('hi',error.name)
            response.send(`<div>No person with id of ${id}</div>`)
        }
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    console.log('lol')
    const id = request.params.id
    Person.findByIdAndDelete({_id: id}).
    then(result => {
        response.status(204).end()
    }).catch(error => next(error))
    /*Person.find({_id: id}).then(person => {
        Person.del
    })
    //persons = persons.filter(person => person.id !== id)*/

    
})

app.put('/api/persons/:id', (request, response, next) => {
    const person = {...request.body}
    console.log(person)
    Person.findByIdAndUpdate(person.id, person, {new: true, runValidators: true, context: 'query'})
    .then(updatedNote => {
        response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    if(Object.keys(request.body).length === 0) {
        return response.status(400).json({
            error: 'missing content'
        })
    }
    const person = {...request.body}
    
    if(!person.name)
    return response.status(401).json({ error: 'missing name' })
    
    if(!person.number){
        console.log("test")
        return response.status(402).json({ error: 'missing number' })
    }
    const insert = new Person({
        name: person.name,
        number: person.number,
    })
    insert.save().then(result => {
        console.log(`${insert.name} saved`)
        response.json(person)
    }).catch(error => next(error))
    //    if(person.find(el => el.name === person.name))
    //         return response.status(403).json({ error:"name must be unique"})
    
    //     Person.find({}).then(persons => {
    //         persons.forEach(el => {
    //             if(el.name === person.name) {
    //                 return response.status(403).json({ error:"name must be unique"})
    //             }
    //         })
    //     })
})

app.get('/info', (request, response) => {
    const dateTime = new Date(Date.now())
    Person.find({}).count().then(el => {
        response.send(
            `<div>
                Phonebook has info for ${el} people
            </div>
            <div>
                ${dateTime}
            </div>
            `
        )
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})