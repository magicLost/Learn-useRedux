import React from 'react';
import classes from './Select.module.scss';
        
const select = ({elementAttrs, value, labelValue, error, onChange, options}) => {

    const getOptions = (options) => {

        return options.map((option, index) => {

            //let selected = (value !== '') ? option.value === value : option.selected;

            return (
                <option
                    value={option.value}
                    key={option.value + index}
                >
                    { option.title }
                </option>
            );

        })

    };

    const optionsElements = getOptions(options);

    return (

        <div className={classes.SelectWrapper}>

            <label htmlFor={elementAttrs.id} className={classes.Label}>{labelValue}</label>

            <select
                className={classes.Select}
                onChange={onChange}
                {...elementAttrs}
                value={value}
            >

                { optionsElements }

            </select>

        </div>
            
    );

};

export default select;
        