import React from 'react';

import classes from './Input.module.scss';


const Input = ({elementAttrs, value, labelValue, error, onChange }) => {

    let inputClass = classes.Input;
    let errorElement = null;

    if(error){

        inputClass += ' ' + classes["Input--Error"];
        errorElement = (
            <div
                className={classes.Error}
            >
                <p>{error}</p>
            </div>
        );

    }

    return (

        <div className={classes.InputWrapper}>

            <label htmlFor={elementAttrs.id} className={classes.Label}>{labelValue}</label>

            <input
                className={inputClass}
                {...elementAttrs}
                value={value}
                onChange={onChange}
            />

            {errorElement}

        </div>

    );
};

export default Input;
        