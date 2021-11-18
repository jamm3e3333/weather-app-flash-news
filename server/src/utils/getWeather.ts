import request from 'axios';

const apiKey = process.env.WEATHER_API;

async function getWeather (city: string, units: string, lat?: string, long?: string) {
    let url = '';

    if(lat && long) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}units=${units}`;
    }
    else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    }
    
    try{
        const response = await request({
            method: 'get',
            url,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status !== 200 || !Object.keys(response.data).length) throw new Error('Error while fetching data.');
        
        const data = {
            weather: response.data.weather,
            temp: response.data.main.temp,
            tempFeels: response.data.main.feels_like,
            pressure: response.data.main.pressure,
            humidity: response.data.main.humidity,
            visibility: response.data.visibility,
            wind: response.data.wind.speed,
            clouds: response.data.clouds.all,
        }

        return data;
    }
    catch(e) {
        return 'Error';
    }
}

export default getWeather;