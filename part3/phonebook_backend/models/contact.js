import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to ', url);
mongoose.connect(url, {family: 4}).then(result => {
    console.log('connected to MongoDB');
}).catch(error => {
    console.log('error connecting to mongoDB: ', error.message);
})

function validator(value){
    const regex = new RegExp("^[0-9]{2,3}-[0-9]{5,}$", "i" )
    return regex.test(value)
}

const customValidator = [validator, "Phone number should be of length 8 and format should be: 12(3)-45678(9) where (X) represents optional entry"]

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        minLength: 8,
        validate: customValidator,
        required: true,
    },
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Contact = mongoose.model('Contact', contactSchema);

export default Contact