const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')

const Person = require('./models/person')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')))

// Info endpoint
app.get('/api/info', (_request, response) => {
  Person.countDocuments({}).then(count => {
    response.json({
      count,
      date: new Date()
    })
  })
})

// Get all persons
app.get('/api/persons', (_request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

// Get single person
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Delete person
app.delete('/api/persons/:id', (_request, response, next) => {
  Person.findByIdAndDelete(_request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Create person
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name,
    number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// Update person
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = {
    name,
    number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (_request, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

// Unknown endpoint
app.use((_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 