import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const deleteEntry = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`).then(response => {
        console.log(response);
    })
}

deleteEntry(2);