import express from 'express';
import { send } from 'process';
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
        const data = await getWeather(city, units);

        if(data === 'Error') throw new Error();

        res.status(200)
            .send(data);
    }
    catch(e) {
        res.status(400)
            .send();
    }
});

app.get('/weather/geo/:units', async (req, res) => {
    const lat = req.query.lat?.toString();
    const long = req.query.long?.toString();

    const units = req.params.units === 'standard' ? '' : req.params.units;

    try {
        if(!lat || !long) {
            return res.status(400)
                        .send();
        }

        const data = await getWeather('', units, lat, long);
        if(data === 'Error') throw new Error();
        res.status(200)
            .send(data);
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


