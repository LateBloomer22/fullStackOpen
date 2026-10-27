let allCountries;

fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
        if(!response.ok){
            throw new Error('HTTP error')
        }
        return response.json()
    })
    .then(data => {
        // console.log(data);
        allCountries = data;
        console.log(Object.entries(allCountries).slice(0,2))
    })
    .catch(error => console.log(error))

    const arraya = [[0, {}], [1, {}], [2, {}]]


// export default allCountries