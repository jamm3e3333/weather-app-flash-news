import request from 'axios';
import getWeather from './getWeather';
const GEO_KEY = process.env.GEO_KEY

interface GeoCB {
    (error: string | undefined, data: any | undefined): void;
}

const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const url2 = '.json?access_token=';

async function getGeolocation(lat: string, long: string, cb: GeoCB) {
    try {
        const response = await request({
            method: 'get',
            url: `${url1}${lat},${long}${url2}${GEO_KEY}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status !== 200 || !Object.keys(response.data).length || !response.data.features.length) throw new Error();
        const city = response.data.features[response.data.features.length-1].place_name;
        if(!city) return cb('error', undefined);

        await getWeather(city, 'metric', (error, dataWeather) => {
            if(error) return cb('error', undefined);
            cb(undefined, dataWeather);
        })
    }
    catch(e) {
        return cb('error', undefined);
    }
}

export default getGeolocation;