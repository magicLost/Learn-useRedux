import React from 'react';
import classes from './FileInput.module.scss';
        
const fileInput = ({elementAttrs, value, labelValue, error, onChange}) => {

    return (

        <div className={classes.FileInput}>

            <label
                className={classes.Label}
                htmlFor={elementAttrs.id}
            >
                { labelValue }
            </label>

            <input
                className={classes.Input}
                type="file"
                {...elementAttrs}
                value={value}
                onChange={onChange}

            />

            { error && <div
                className={classes.Error}
            >
                <p>{error}</p>
            </div> }

        </div>
            
    );
};

export default fileInput;
        