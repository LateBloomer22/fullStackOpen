// import 'dotenv/config'

// const api_key = process.env.VITE_WEATHER_API_KEY

const returnURL = (lat, long, api_key) => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`
}

const weather = async (lat, long, api_key) => {
    try {
        const response = await fetch(returnURL(lat,long, api_key))

        if(!response.ok){
            return 'not found';
        }
        return await response.json()
    } catch {
        return 'not found'
    }
}

// weather(42, 39, api_key).then(response => console.log(response, typeof(response)))

export default weather
