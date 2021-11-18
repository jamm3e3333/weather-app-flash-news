import express from 'express';
import { send } from 'process';
import getGeolocation from './utils/getGeolocation';
import getWeather from './utils/getWeather';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Server is running</h1>');
});

app.get('/weather/:city/:units', async (req, res) => {
    const units = req.params.units === 'standard' ? '' : req.params.units;
    
    const city = req.params.city;

    try {
        await getWeather(city, units, (error, data) => {
            if(error) {
                return res.status(400)
                            .send();
            }
            res.status(200)
                .send(data);
        });
    }
    catch(e) {
        res.status(400)
            .send();
    }
});

app.get('/weather/geolocation/:long/:lat', async (req, res) => {
    const lat = req.params.lat;
    const long = req.params.long;
    if(!lat || !long) return res.status(400).send();

    try{
        await getGeolocation(long,lat, (error, data) => {
            if(error) {
                return res.status(400)
                            .send();
            }
            res.status(200)
                .send(data);
        });
    }
    catch(e) {
        res.status(400)
            .send();
    }
});

app.get('*', (req, res) => {
    res.send('<h1>404</h1><h2>Page not found</h2>');
})

export default app;


