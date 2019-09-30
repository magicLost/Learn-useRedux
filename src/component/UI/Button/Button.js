import React from 'react';
import classes from './Button.module.scss';

export const button_type = {
    TEXT: 'TEXT',
    OUTLINED: 'OUTLINED',
    CONTAINED: 'CONTAINED'
};

const button = ({label, type, disabled, onClick, style}) => {

    let buttonClasses = classes.Button;

    switch(type){
        case button_type.TEXT: buttonClasses += ' ' + classes["Button--Text"];break;
        case button_type.OUTLINED: buttonClasses += ' ' + classes["Button--Outlined"];break;
        case button_type.CONTAINED: buttonClasses += ' ' + classes["Button--Contained"];break;

        default:
            console.error("Bad button type " + type);
            buttonClasses += ' ' + classes["Button--Text"];
            break;
    }

    return (

        <button

            className={buttonClasses}
            onClick={onClick}
            style={style}
            disabled={disabled}
        >
            <span className={classes.Label}>{ label }</span>
        </button>
            
    );
};

export default button;
        