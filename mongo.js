const mongoose = require('mongoose')

if (process.argv.length < 5) {
	console.log('give password, name and number as arguments')
	process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const dbName = 'phonebookApp'

const url =
  `mongodb+srv://fullstack:${password}@cluster0.1irz8b4.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
	name: `${name}`,
	number: `${number}`
})

person.save().then(result => {
	console.log(`added ${name} number ${number} to phonebook`)
	mongoose.connection.close()
})

/*
Note.find({}).then(result => {
	result.forEach(note => {
		console.log(note.content)
	})
	mongoose.connection.close()
})
*/
