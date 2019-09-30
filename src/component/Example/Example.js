import React from 'react';
import { useReducer, useEffect } from 'react';

import classes from './Example.module.scss';
import { useTest } from '../../hooks/example';




//13
//clear state on hide
const Example = () => {

    console.log("render Example - start");

   

    //const [ hello, buy, title, dispatch ] = useTest();
    const [ hello, buy, setValues ] = useTest();




    /* useEffect(() => {

        console.log("useEffect - inputValue");

        return () => {
            console.log("Clean up - inputValue");
        }

    }, [inputValue]); */

    

    const onClick = (event) => {

        event.stopPropagation();
        
        //dispatch({type: "SET_TITLE", title: "Are you idiot?"});
        setValues("Hello, my..", "Buy, my..");

    };


    console.log("render Example - end");

    return (

        <div className={classes.Example}>

            
            <p>
                <span>{ hello }</span>
                <span> | </span>
                <span>{ buy }</span>
            </p>

            <button onClick={onClick}>Change</button>

            
        </div>

    );
};

export default Example;
        