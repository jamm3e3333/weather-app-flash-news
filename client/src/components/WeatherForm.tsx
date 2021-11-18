import CardComponent from './UI/Card';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import classes from './WeatherForm.module.css';

const WeatherFormComponent = () => {
    let isTouched = false;

    const [city, setCity] = useState('');
    const [valid, setValid] = useState(true);

    function handleGetWeather(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        isTouched = false;
    }

    function handleInputCity(e: ChangeEvent<HTMLInputElement>) {
        setCity(e.target.value);
    }

    function handleBlurCity() {
        isTouched = true;
    }

    useEffect(() => {
        if(isTouched && !city.trim()) {
            setValid(false);
        }
        else setValid(true);
    }, [isTouched, city]);

    return (
        <CardComponent>
            <form onSubmit={handleGetWeather}>
                <input 
                    placeholder="Type city..." 
                    type="text" 
                    maxLength={200}
                    onChange={handleInputCity}
                    onBlur={handleBlurCity}
                    value={city}
                    className={`${valid ? 'invalid' : ''}`}
                />
                <button type="submit">Search weather</button>
            </form>
        </CardComponent>
    )
}

export default WeatherFormComponent;