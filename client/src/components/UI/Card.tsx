import React from 'react';
import classes from './Card.module.css';

interface CardProps {
    className?: string,
}

const CardComponent: React.FC<CardProps> = (props) => {
    return (
        <div className={`${classes.card} ${props.className}`}>{props.children}</div>
    )
}

export default CardComponent;