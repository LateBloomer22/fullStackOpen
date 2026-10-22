import express from 'express'
import morgan from 'morgan';
import 'dotenv/config'
import Contact from './models/contact.js';

const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server active on ${PORT}`))

app.use(express.json())
app.use(express.static('dist'))

const requestLogger = (req, res, next) => {
    console.log('Method', req.method);
    console.log('path', req.path);
    console.log('Body', req.body);
    console.log('---');
    next()
}

// app.use(requestLogger)

app.use(morgan(function(tokens, req,res) {
    return [
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        JSON.stringify(req.body),
    ].join(' ')
}))


app.get('/api/persons', (req,res) => {
    Contact.find({}).then(result => {
        res.json(result)
    })
})

app.get('/info', (req,res) => {
    req.arrivedAt = new Date();
    Contact.countDocuments({}).then(result => {
        const message = `
            <div>
                Phonebook has info for ${result} people
            </div>
            <div>
                ${req.arrivedAt}
            </div>`;
        res.send(message);
    })
})

app.get('/api/persons/:id', (req,res) => {
    Contact.findById(req.params.id).then(contact => {
        res.json(contact)
    })
})

// app.get('/api/notes/:id', (request, response) => {
//   Note.findById(request.params.id).then(note => {
//     response.json(note)
//   })
// })

// app.delete('/api/persons/:id' , (req, res) => {
//     const id = req.params.id;
//     const personFound = phonebook.some(person => person.id === id);
//     if(personFound){
//         res.send(phonebook.filter(person => person.id === id)[0])
//         phonebook = phonebook.filter(person => person.id !== id);
//         console.log(phonebook);
        
//     } else {
//         res.statusMessage = 'Person was not found';
//         res.status(404).end()
//     }
// })

// const generateId = () => {
//   const maxId = phonebook.length > 0 ? Math.max(...phonebook.map(person => Number(person.id))) : 0
//   return String(maxId + 1)
// }

// app.post('/api/persons', (req,res) => {
//     const body = req.body;

//     if(!body.name || !body.number){
//         return res.status(404).json({
//             error: "Name / Number field missing"
//         });
//     } else if (phonebook.some(person => person.name === body.name)){
//         return res.status(404).json({
//             error: "This name already exists, names must be unique in database"
//         })
//     }

//     const person = {
//         id: generateId(),
//         name: body.name,
//         number: body.number
//     }

//     phonebook = phonebook.concat(person);
//     res.send(person)

    
// })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

