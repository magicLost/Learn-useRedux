import React, {useEffect, useMemo} from 'react';
import classes from './CarouselOpacity.module.scss';
import {useCarouselOpacity} from "../../../hooks/Carousel/carousel";
import CalcOpacity from './Helper/calcOpacity';
        
const CarouselOpacity = ({items, getItem, activeIndex, increaseActiveIndex, decreaseActiveIndex}) => {

    const [ opacity, isTranslated, dispatch ] = useCarouselOpacity(new CalcOpacity());

    console.log("render carouselTranslate");

   /*  useEffect(() => {

        if(state.isTranslated){
            window.addEventListener('mousemove', onMouseMove, false);
            window.addEventListener('mouseup', onMouseUp, false);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove, false);
            window.removeEventListener('mouseup', onMouseUp, false);
        };

    }, []);
 */
    /*MOUSE EVENTS*/
    const onMouseDown = (event) => {

        console.log("onMouseDown");

        event.preventDefault();
        event.stopPropagation();

        dispatch({type: "POINTER_DOWN", pageX: event.pageX, pageY: event.pageY});

        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('mouseup', onMouseUp, false);

        //onPointerDown(event.pageX);
    };

    const onMouseMove = (event) => {

        console.log("onMouseMove");

        event.preventDefault();
        event.stopPropagation();

        dispatch({type: "POINTER_MOVE", pageX: event.pageX, pageY: event.pageY});

        //onPointerMove(event.pageX);
    };

    const onMouseUp = (event) => {

        console.log("onMouseUp");

        event.preventDefault();
        event.stopPropagation();


        dispatch({
            type: "POINTER_UP", 
            increaseActiveIndex: increaseActiveIndex, 
            decreaseActiveIndex: decreaseActiveIndex
        });

        window.removeEventListener('mousemove', onMouseMove, false);
        window.removeEventListener('mouseup', onMouseUp, false);

        //onPointerUp(increaseActiveIndex, decreaseActiveIndex);
    };

    /*TOUCH EVENTS*/
    const onTouchStart = (event) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        dispatch({type: "POINTER_DOWN", pageX: touches.pageX, pageY: touches.pageY});
        //onPointerDown(touches.pageX, touches.pageY);

    };

    const onTouchMove = (event) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        dispatch({type: "POINTER_MOVE", pageX: touches.pageX, pageY: touches.pageY});

        //onPointerMove(touches.pageX, touches.pageY);

    };

    const onTouchEnd = (event) => {

        event.preventDefault();
        event.stopPropagation();

        //onPointerUp(increaseActiveIndex, decreaseActiveIndex);
        dispatch({
            type: "POINTER_UP", 
            increaseActiveIndex: increaseActiveIndex, 
            decreaseActiveIndex: decreaseActiveIndex
        });

    };

    /*RENDER*/

    const getItems = () => {

        console.log("getItems");

        return items.map((value, index) => {

            let style = null;

            if(activeIndex === index){

                if(isTranslated){

                    style = {
                        transitionProperty: 'opacity',
                        opacity: opacity
                    }

                }else{

                    style = {
                        transitionProperty: 'opacity',
                        transitionDuration: '1s',
                        opacity: opacity
                    }

                }

            }

            return (

                <li
                    key={classes.Item + index}
                    className={classes.Item}
                    style={style}
                >

                    { getItem(index, activeIndex) }

                </li>

            );

        });

    };

    return (
        
        <div className={classes.CarouselOpacity}>

            <ul
                className={classes.ItemsList}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >

                { useMemo(getItems, [activeIndex, opacity, isTranslated]) }

            </ul>

        </div>
            
    );
};

export default CarouselOpacity;
        