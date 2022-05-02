const express = require('express')
const { json } = require('express/lib/response')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('body', (request, response) => {return JSON.stringify(request.body)})

app.use(morgan(':method :url :response-time :body'))


let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    },
    {
        "id": 5,
        "name": "IBM Watson",
        "number": "01-10-1010101011"
      }
]



// app.get('/', (request, response) => {
//     response.send('<h1>Landing page lol</h1>')
// })

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person)
        response.json(person)
    else
        response.send(`<div>No person with id of ${id}</div>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    if(Object.keys(request.body).length === 0) {
        return response.status(400).json({
            error: 'missing content'
        })
    }
    const person = {...request.body}

    if(!person.name)
        return response.status(401).json({ error: 'missing name' })

    if(!person.number)
        return response.status(402).json({ error: 'missing number' })

    if(persons.find(el => el.name === person.name))
        return response.status(403).json({ error:"name must be unique"})

    person.id = Math.floor(Math.random() * 10000)
    persons = persons.concat(person)

    response.json(person)

})

app.get('/info', (request, response) => {
    const dateTime = new Date(Date.now())

    response.send(
        `<div>
            Phonebook has info for ${persons.length} people
        </div>
        <div>
            ${dateTime}
        </div>
        `
    )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})