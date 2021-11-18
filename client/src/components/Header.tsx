import classes from './Header.module.css';


const HeaderComponent = () => {
    return (
        <header className={classes.header}>
            <h1 className={classes['header-items']} >The Weather app</h1>
            <p className={classes['header-items']} >API supported by Open Weather Map and Mapbox</p>
        </header>
    )
}

export default HeaderComponent;