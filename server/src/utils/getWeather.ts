import request from 'axios';

const apiKey = process.env.WEATHER_API;

interface GeoCB {
    (error: string | undefined, data: any | undefined): void;
}

async function getWeather (city: string, units: string, cb: GeoCB) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    
    try{
        const response = await request({
            method: 'get',
            url,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status !== 200 || !Object.keys(response.data).length) throw new Error();
        const data = {
            weather: response.data.weather,
            temp: response.data.main.temp,
            tempFeels: response.data.main.feels_like,
            pressure: response.data.main.pressure,
            humidity: response.data.main.humidity,
            visibility: response.data.visibility,
            wind: response.data.wind.speed,
            clouds: response.data.clouds.all,
            city: response.data.name,
        }

        return cb(undefined,data);
    }
    catch(e) {
        console.error(e);
        return cb('error', undefined);
    }
}

export default getWeather;