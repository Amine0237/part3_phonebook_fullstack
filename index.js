const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.static('build'))
app.use(morgan('combined'))

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456'
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523'
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345'
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122'
	}
]

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/info', (request, response) => {
	response.send(`Phonebook has info for ${persons.length} people <br><br> ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)

	if (person) response.json(person)
	else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter((note) => note.id !== id)
	response.status(204).end()
})

app.post('/api/persons', (request, response) => {
	const body = request.body
	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'name or number missing'
		})
	}

	const name = persons.find(person => person.name === body.name)
	if (name) {
		return response.status(400).json({
			error: 'name must be unique'
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId()
	}

	persons = persons.concat(person)

	response.json(person)
})

const generateId = () => {
	const x = Math.floor((Math.random() * 10000) + 1)
	return x
}

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
