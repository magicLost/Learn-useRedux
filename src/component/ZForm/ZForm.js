import React, { useMemo } from 'react';
import classes from './ZForm.module.scss';
import {button_type} from "../UI/Button/Button";
import Button from "../UI/Button/Button";

export const element_type = {
    INPUT: "INPUT",
    TEXTAREA: "TEXTAREA",
    SELECT: "SELECT",
};

const ZForm = ({formError, onSubmit, clearButtonClickHandler, children}) => {


    return (

        <div className={classes.Wrapper}>

            <div className={classes.ZForm} >

            <form action={""} className={classes.FormElements} onSubmit={onSubmit}>

                { children }

                { formError && <div className={classes.FormError}>
                    <p>{ formError }</p>
                </div> }

                <div className={classes.Buttons}>

                    { useMemo(() => (
                        <Button
                            label={"Очистить"}
                            type={button_type.OUTLINED}
                            onClick={clearButtonClickHandler}
                            style={{ color: 'rgba(0, 0, 0, 0.3)', borderColor: 'rgba(0, 0, 0, 0.3)'}}
                        />
                    ), [])}

                    { useMemo(() => (
                        <Button
                            label={"Отправить"}
                            type={button_type.OUTLINED}
                            style={{ color: 'rgba(178, 243, 141, 0.85)', borderColor: 'rgba(178, 243, 141, 0.85)'}}
                        />
                    ), [])}

                </div>

            </form>

            </div>


        </div>


    );
};

export default ZForm;
        