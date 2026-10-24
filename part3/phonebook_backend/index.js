import express from 'express'
import morgan from 'morgan';
import 'dotenv/config'
import Contact from './models/contact.js';

const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server active on ${PORT}`))

app.use(express.json())
app.use(express.static('dist'))

app.use(morgan(function(tokens, req,res) {
    return [
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        JSON.stringify(req.body),
    ].join(' ')
}))


app.get('/api/persons', (req,res, next) => {
    Contact.find({}).then(result => {
        res.json(result)
    }).catch(error => next(error))
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

app.get('/api/persons/:id', (req,res, next) => {
    Contact.findById(req.params.id).then(contact => {
        res.json(contact)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id' , (req, res) => {
    const id = req.params.id;
    console.log(id, typeof(id));
    Contact.findByIdAndDelete(id).then(
        contact => {console.log(contact);
        res.send(contact)
    })
})

app.put('/api/persons/:id', (req,res,err) => {
    const {number} = req.body;
    Contact.findById(req.params.id)
        .then(contact => {
            if(!contact){
                return res.status(404).end()
            }
            contact.number = number
            return contact.save().then((updatedContact) => {
                res.json(updatedContact)
            })
        }).catch(err => next(err))
})


app.post('/api/persons', (req,res, next) => {
    const body = req.body;
    if(!body.name || !body.number){
        return res.status(404).json({
            error: "Name / Number field missing"
        });
    }
    
    const contact = new Contact({
        name: body.name,
        number: body.number
    })
    
    contact.save().then(savedContact => {
        res.json(savedContact)
    }).catch(error => next(error))
})


const unknownEndpoint = (req, res, next) => {
    const error = new Error('unknown');
    next(error)
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    if(error.name === 'CastError'){
        return res.status(400).send({error: 'id value is not correct'})
    } else if (error.message === 'unknown') {
        return res.status(400).send({error: 'Sorry, this endpoint is not valid'})
    }  else if (error.name === 'ValidationError'){
        return res.status(400).json({error: error.message})
    }
    next(error)
}

app.use(errorHandler)

/* Portions ignored for exercise 3.14
} else if (phonebook.some(person => person.name === body.name)){
    return res.status(404).json({
        error: "This name already exists, names must be unique in database"
})
}

Contact.deleteOne({_id })
const personFound = phonebook.some(person => person.id === id);
if(personFound){
    res.send(phonebook.filter(person => person.id === id)[0])
    phonebook = phonebook.filter(person => person.id !== id);
    console.log(phonebook);
    
} else {
    res.statusMessage = 'Person was not found';
    res.status(404).end()
}

const requestLogger = (req, res, next) => {
    console.log('Method', req.method);
    console.log('path', req.path);
    console.log('Body', req.body);
    console.log('---');
    next()
}

app.use(requestLogger)
*/
       
        
        