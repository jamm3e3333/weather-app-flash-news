import CardComponent from './UI/Card';
import CardItemComponent from './UI/CardItem';
import { ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react';
import classes from './WeatherForm.module.css';

const url = 'api/weather';

const WeatherFormComponent = () => {
    const [city, setCity] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const [data, setData] = useState<any | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [geoNotSupported, setGeoNotSupported] = useState(false);

    const valueIsValid = city.trim() || false;
    const hasError = !valueIsValid && isTouched;

    const cityInputRef = useRef<HTMLInputElement>(null);

    async function fetchWeather(url: string) {
        try {
            setIsLoading(true);
            setIsError(false);
            setData(undefined);

            const response = await fetch(url);
            if(response.status !== 200) throw new Error();

            const data = await response.json();
            if(!data) throw new Error();

            setData(data);
            setIsLoading(false);
        }
        catch(e) {
            setIsLoading(false);
            setIsError(true);
            setData(undefined);
            console.error(e);
        }
    }

    function handleGetWeather(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(hasError) return;
        if(cityInputRef.current) cityInputRef.current.blur();
        setCity('');
        setIsTouched(false);

        fetchWeather(`${url}/${encodeURI(city)}/metric`);
    }

    function handleInputCity(e: ChangeEvent<HTMLInputElement>) {
        setCity(e.target.value);
    }

    function handleBlurCity() {
        setIsTouched(true);
    }

    useEffect( () => {
        if(!navigator.geolocation) {
            setGeoNotSupported(false);
        }
        else {
            navigator.geolocation.getCurrentPosition(position => {
                fetchWeather(`${url}/geolocation/${position.coords.longitude}/${position.coords.latitude}`);
            })
        }
    }, [setGeoNotSupported])
    return (
        <div className={classes['form-wrapper']}>
            <CardComponent>
                <form onSubmit={handleGetWeather}>
                    <div className={classes['form-weather']}>
                        <div>
                        <input 
                            placeholder="Type a city..." 
                            type="text" 
                            maxLength={200}
                            onChange={handleInputCity}
                            onBlur={handleBlurCity}
                            value={city}
                            className={`${hasError ? 'invalid' : ''}`}
                            ref={cityInputRef}
                        />
                        {hasError && <p className={classes['invalid-invoice']}>Not a valid city</p>}
                        </div>
                        <button 
                            disabled={hasError || !city || isLoading} 
                            type="submit">Search weather
                        </button>
                    </div>
                </form>
            </CardComponent>
            {(data && !isLoading && !isError) &&
            <CardComponent>
                <div className={classes['weather-data--wrapper']}>
                <CardItemComponent>
                    <p className={classes['weather-data--name']}>Location: </p>
                    <p className={classes['weather-data--city']} >{data.city}</p>
                </CardItemComponent>
                <CardItemComponent>
                    <p className={classes['weather-data--name']}>
                        {data.weather[0].description}
                    </p>
                    <div className={classes['weather-data--icon']}>
                        <img 
                            className={classes['weather-data--image']} 
                            src={`${process.env.PUBLIC_URL}/assets/svg-weather-icons/${data.weather[0].icon}.svg`}
                            alt={data.weather[0].description} 
                            width={75}
                        />
                    </div>
                </CardItemComponent>
                <CardItemComponent>
                    <p className={classes['weather-data--name']}>Temperature:</p>
                    <p>{data.temp} °C</p>
                </CardItemComponent>
                <CardItemComponent>
                    <p className={classes['weather-data--name']}>Temperature feels like:</p>
                    <p> {data.tempFeels} °C</p>
                </CardItemComponent>
                <CardItemComponent>
                    <p className={classes['weather-data--name']}>Humidity: </p>
                    <p>{data.humidity} %</p>
                </CardItemComponent>
                <CardItemComponent>
                    <p className={classes['weather-data--name']}>Wind speed: </p>
                    <p>{data.wind} m/s</p>
                </CardItemComponent>
                <CardItemComponent>
                    <p className={classes['weather-data--name']}>Clouds: </p>
                    <p>{data.clouds} %</p>
                </CardItemComponent>
                </div>
            </CardComponent>}
            {(isError && !isLoading) && 
            <CardComponent>
                <p className={classes['error-fetch']}>Error while fetching data</p>
            </CardComponent>}
            {(isLoading && !isError) && 
            <CardComponent>
                <p>Loading...</p>
            </CardComponent>}
            {(!isLoading && !isError && !data) && 
            <CardComponent className={classes.welcome}>
                <h1 className={classes['welcome-header']}>Welcome to the weather app</h1>
                {!geoNotSupported && 
                <p className={classes['welcome-geo--allow']}>
                    To see the weather based on your location please, allow acces to your location in your browser and reload the page.
                </p>}
            </CardComponent>}
        </div>
    )
}

export default WeatherFormComponent;