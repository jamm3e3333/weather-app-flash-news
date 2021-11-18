import React from 'react';
import classes from './CardItem.module.css';

interface CardItemProps {
    className?: string;
}

const CardItemComponent: React.FC<CardItemProps> = (props) => {
    return <div className={`${classes['card-item--wrapper']} ${props.className}}`}>{props.children}</div>
}

export default CardItemComponent;