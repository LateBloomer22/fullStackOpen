import data from './db.js'
import express from 'express'
const app = express();

const PORT = 3001;
app.listen(PORT, () => console.log(`Server active on ${PORT}`))

let phonebook = data;

app.get('/api/persons', (req,res) => {
    res.send(phonebook)
})

app.get('/info', (req,res) => {
    req.arrivedAt = new Date();
    const message = `
    <div>
        Phonebook has info for ${phonebook.length} people
    </div>
    <div>
        ${req.arrivedAt}
    </div>
    `;
    res.send(message);
})

app.get('/api/persons/:id', (req,res) => {
    const id = req.params.id;
    const person = phonebook.find(person => person.id === id)
    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id' , (req, res) => {
    const id = req.params.id;
    const personFound = phonebook.some(person => person.id === id);
    if(personFound){
        phonebook = phonebook.filter(person => person.id !== id);
        res.send(`person with id ${id} was deleted from database`)
        console.log(phonebook);
        
    } else {
        res.statusMessage = 'Person was not found';
        res.status(404).end()
    }
    
})
