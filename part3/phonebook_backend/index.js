import phonebook from './db.js'
import express from 'express'
const app = express();

const PORT = 3001;
app.listen(PORT, () => console.log(`Server active on ${PORT}`))

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
