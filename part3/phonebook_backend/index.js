import data from './db.js'
import express from 'express'
const app = express();

const PORT = 3001;
app.listen(PORT, () => console.log(`Server active on ${PORT}`))

app.use(express.json())

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

const generateId = () => {
  const maxId = phonebook.length > 0 ? Math.max(...phonebook.map(person => Number(person.id))) : 0
  return String(maxId + 1)
}

app.post('/api/persons', (req,res) => {
    const body = req.body;

    if(!body.name || !body.number){
        return res.status(404).json({
            error: "Name / Number field missing"
        });
    } else if (phonebook.some(person => person.name === body.name)){
        return res.status(404).json({
            error: "This name already exists, names must be unique in database"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    phonebook = phonebook.concat(person);
    res.send(`${person.name} was added to db`)
})

