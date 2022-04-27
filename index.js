const express = require('express')
const app = express()

app.use(express.json())

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

const dateTime = new Date(Date.now())

app.get('/', (request, response) => {
    response.send('<h1>Landing page lol</h1>')
})

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

    const person = request.body
    person.id = Math.floor(Math.random() * 10000)
    persons = persons.concat(person)

    response.json(person)

})

app.get('/info', (request, response) => {
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})