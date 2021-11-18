import CardComponent from './UI/Card';
import { ChangeEvent, FormEvent, useState } from 'react';
import classes from './WeatherForm.module.css';
const url = 'api/weather';

const WeatherFormComponent = () => {
    const [city, setCity] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const [data, setData] = useState<any | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const valueIsValid = city.trim() || false;
    const hasError = !valueIsValid && isTouched;

    async function fetchWeather(url: string) {
        try {
            setIsLoading(true);
            setIsError(false);
            setData(undefined);

            const response = await fetch(`${url}/${city}/metric`);
            console.log(response);
            if(response.status !== 200) throw new Error();

            const data = await response.json();
            if(!data) throw new Error();

            setData(data);
            setIsLoading(false);
            console.log(data);
        }
        catch(e) {
            setIsLoading(false);
            setIsError(true);
            setData(undefined);
            console.log(e);
        }
    }

    function handleGetWeather(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setCity('');
        setIsTouched(false);

        fetchWeather(url);
    }

    function handleInputCity(e: ChangeEvent<HTMLInputElement>) {
        setCity(e.target.value);
    }

    function handleBlurCity() {
        setIsTouched(true);
    }

    return (
        <>
            <CardComponent>
                <form className={classes['form-weather']} onSubmit={handleGetWeather}>
                    <div>
                        <input 
                            placeholder="Type city..." 
                            type="text" 
                            maxLength={200}
                            onChange={handleInputCity}
                            onBlur={handleBlurCity}
                            value={city}
                            className={`${hasError ? 'invalid' : ''}`}
                        />
                        <button type="submit">Search weather</button>
                    </div>
                </form>
            </CardComponent>
            {(data && !isLoading && !isError) &&
            <CardComponent>
                <div className={classes['weather-data--wrapper']}>
                    <p className={classes['weather-data--description']}>
                        {data.weather[0].description}
                    </p>
                    <div className={classes['weather-data--icon']}>
                        <img 
                            className={classes['weather-data--image']} 
                            src={`../../assets/svg-weather-icons/${data.weather[0].icon}`} 
                            alt={data.weather[0].description} 
                        />
                    </div>
                    <p>Temperature: {data.temp} °C</p>
                    <p>Temperature feels like: {data.tempFeels} °C</p>
                    <p>Humidity: {data.humidity} %</p>
                    <p>Wind speed: {data.wind} m/s</p>
                    <p>Clouds: {data.clouds} %</p>
                </div>
            </CardComponent>}
            {(isError && !isLoading) && 
            <CardComponent>
                <p>Error while fetching data</p>
            </CardComponent>}
            {(isLoading && !isError) && 
            <CardComponent>
                <p>Loading...</p>
            </CardComponent>}
        </>
    )
}

export default WeatherFormComponent;