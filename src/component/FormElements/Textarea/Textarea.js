import React, { useState } from 'react';
import classes from './Textarea.module.scss';
        
const Textarea = ({elementAttrs, value, labelValue, error, onChange, isResize}) => {

    const [ style, setStyle ] = useState(null);

    const onKeyUp = (event) => {

        event.stopPropagation();

        const target = event.target;

        if (target.scrollHeight > target.clientHeight) {

            //this.setState({style: { height: target.scrollHeight + 10 + "px"}});
            setStyle({ height: target.scrollHeight + 10 + "px"});
            //target.style.height = target.scrollHeight + 10 + "px";

        }
    };

    let textareaClass = classes.Textarea;

    let textAreaStyle = isResize ? style : null;
    let keyUpHandler = isResize ? onKeyUp : null;
    let errorElement = null;

    if(error){

        textareaClass += ' ' + classes["Textarea--Error"];
        errorElement = (
            <div
                className={classes.Error}
            >
                <p>{error}</p>
            </div>
        );

    }

    return (

        <div className={classes["TextareaWrapper"]}>

            <label
                htmlFor={elementAttrs.id}
                className={classes.Label}>{labelValue}
            </label>

            <textarea
                style={textAreaStyle}
                onKeyUp={keyUpHandler}
                className={textareaClass}
                {...elementAttrs}
                value={value}
                onChange={onChange}
            />

            {errorElement}

        </div>
            
    );
};

export default Textarea;
        