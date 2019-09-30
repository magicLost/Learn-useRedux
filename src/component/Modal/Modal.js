import React from 'react';
import classes from './Modal.module.scss';
import BackDrop from "../BackDrop/BackDrop";
        
const modal = ({show, backdropClickHandler, children}) => {

    return (
        <>
            <BackDrop show={show} backdropClickHandler={backdropClickHandler} />
            <div
                className={classes.Modal}
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}
            >
                { show && children}
            </div>
        </>
    );
};

export default modal;
        