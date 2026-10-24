import mongoose from "mongoose";

if(process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://usaneja_db_user:${password}@cluster0.ws4mw9d.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3){
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(contact);
        })
        mongoose.connection.close()
    })
} else {
    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    contact.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close()
    })
}
