import React from 'react';
import classes from './Card.module.scss';
import Button, {button_type} from "../UI/Button/Button";


const card = ({index, onClick }) => {


    return (

        <div className={classes.Card}>

            <div className={classes.Content}>

                <p className={[classes.TextSecondary, classes.MarginBottom].join(' ')}>Word of the Day</p>

                <h2>Benevolent - { index }</h2>

                <p className={[classes.TextSecondary, classes.MarginBottom].join(' ')}>adjective</p>

                <p>
                    well meaning and kindly.
                    <br />
                    "a benevolent smile"
                </p>

            </div>

            <div className={classes.Actions}>

                <Button onClick={onClick} label={"learn more"} type={button_type.TEXT} />

            </div>

        </div>
            
    );
};

export default card;
        