const url = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const allCountries = async () => {
    try {
        const response = await fetch(url);
        if(!response.ok){
            return [];
        }
        return await response.json();
    } catch {
        return [];
    }
}


export default allCountries