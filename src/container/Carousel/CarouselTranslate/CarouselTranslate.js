import React, {useMemo} from 'react';
import classes from './CarouselTranslate.module.scss';
import {useCarouselTranslate} from "../../../hooks/Carousel/carousel";

//import {useCarouselTranslate} from "../../../hooks/carousel";
//import {getTranslateX} from "./Helper/tech";
import CalcTranslateX from './Helper/calcTranslateX';

const CarouselTranslate = ({itemsLength, items, activeIndex, increaseActiveIndex, decreaseActiveIndex, getItem }) => {

    //const [ isTranslated, state, onPointerDown, onPointerMove, onPointerUp ] = useCarouselTranslate(itemsLength, activeIndex, increaseActiveIndex, decreaseActiveIndex);
    const [  translateX, isTranslated, listStyle, getTranslateX, dispatch ] = useCarouselTranslate(new CalcTranslateX());

    console.log("render carouselTranslate");


    /*MOUSE EVENTS*/
    const onMouseDown = (event) => {

        //console.log("onMouseDown");

        event.preventDefault();
        event.stopPropagation();

        dispatch({type: "POINTER_DOWN", pageX: event.pageX, pageY: event.pageY});

        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('mouseup', onMouseUp, false);

    };

    const onMouseMove = (event) => {

        //console.log("onMouseMove - ", isTranslated);

        event.preventDefault();
        event.stopPropagation();

        dispatch({
            type: "POINTER_MOVE", 
            pageX: event.pageX,
            pageY: event.pageY,
            activeIndex: activeIndex, 
            itemsLength: itemsLength
        });
    };

    const onMouseUp = (event) => {

        //console.log("onMouseUp");

        event.preventDefault();
        event.stopPropagation();

        /*window.removeEventListener('mousemove', onMouseMove, false);
        window.removeEventListener('mouseup', onMouseUp, false);*/

        dispatch({
            type: "POINTER_UP", 
            increaseActiveIndex: increaseActiveIndex, 
            decreaseActiveIndex: decreaseActiveIndex
        });

        window.removeEventListener('mousemove', onMouseMove, false);
        window.removeEventListener('mouseup', onMouseUp, false);

    };

    /*TOUCH EVENTS*/
    const onTouchStart = (event) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        dispatch({type: "POINTER_DOWN", pageX: touches.pageX, pageY: touches.pageY});

    };

    const onTouchMove = (event) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        dispatch({
            type: "POINTER_MOVE", 
            pageX: touches.pageX,
            pageY: touches.pageY,
            activeIndex: activeIndex, 
            itemsLength: itemsLength
        });
    };

    const onTouchEnd = (event) => {

        event.preventDefault();
        event.stopPropagation();

        dispatch({
            type: "POINTER_UP", 
            increaseActiveIndex: increaseActiveIndex, 
            decreaseActiveIndex: decreaseActiveIndex
        });

    };

    /*RENDER*/
    const finalTranslateX = getTranslateX(activeIndex, translateX);

    const finalListStyle = {
        ...listStyle,
        transform: 'translateX(' + finalTranslateX + ')'
    };

    const getItems = (itemClass) => {

        console.log("CarouselTranslate getItems");

        return items.map((value, index) => {

            //return getItem(index, 0, itemClass);
            //console.log("item");

            return (

                <li key={classes.Item + index} className={classes.Item}>
                    {getItem(index, activeIndex)}
                </li>

            ); 

        });

    }

    return (

        <div className={classes.CarouselTranslate}>

            <ul
                className={classes.ItemsList}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={finalListStyle}
            >

                { useMemo(getItems, [])  }

            </ul>

        </div>

    );
};

export default CarouselTranslate;
        