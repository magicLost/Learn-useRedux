import React, {useEffect, useRef, useMemo} from 'react';
import classes from './Scroller.module.scss';
import {useScroller, actions} from "../../hooks/Scroller/scroller";
import Card from "../../component/Card/Card";
import CalcTranslateX from './Helper/calcTranslateX';
import EventSorter from './Helper/eventSorter';



        
const Scroller = ({numberOfItems, items, getClickableNode, itemClickHandler}) => {

    const [ translateX, isNeedScroller, listStyle, eventType, dispatch ] = useScroller(new CalcTranslateX(), new EventSorter());

    console.log("render scroller",  translateX, isNeedScroller, listStyle);

    /*REF*/
    const containerRef = useRef(null);
    const listRef = useRef(null);
    const itemRef = useRef(null);


    useEffect(() => {

        window.addEventListener("resize", onWindowResize, false);
        //console.log("useEffect");

        dispatch({
            type: actions.INIT,
            containerRef: containerRef,
            itemRef: itemRef,
            listRef: listRef,
            numberOfItems: numberOfItems,
        });

    }, []);

    /*LISTENERS*/

    const onWindowResize = (event) => {

        dispatch({
            type: actions.WINDOW_RESIZE,
            containerRef: containerRef,
            itemRef: itemRef,
            listRef: listRef,
            numberOfItems: numberOfItems,
        });

    };

    const onMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();

        //console.log("onMouseDown ", listRef.current.getBoundingClientRect());

        //onPointerDown(event.pageX, event.pageY, listRef.current.getBoundingClientRect().x);

        dispatch({
            type: actions.POINTER_DOWN,
            listRef: listRef,
            pageX: event.pageX,
            pageY: event.pageY
        });

        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('mouseup', onMouseUp, false);

    };

    const onMouseMove = (event) => {
        event.preventDefault();
        event.stopPropagation();

        //console.log("onMouseMove");

        dispatch({
            type: actions.POINTER_MOVE,
            pageX: event.pageX,
            pageY: event.pageY
        });

    };

    const onMouseUp = (event) => {
        event.preventDefault();
        event.stopPropagation();

        dispatch({
            type: actions.POINTER_UP,
            pageX: event.pageX,
            pageY: event.pageY
        });

        window.removeEventListener('mousemove', onMouseMove, false);
        window.removeEventListener('mouseup', onMouseUp, false);

    };

    

    const onItemClick = (event) => {

        event.preventDefault();
        event.stopPropagation();

        //index, itemClickHandler
        //itemClickHandler(parseInt(event.target.dataset.index));
        //console.log("onItemClick", event.target);

        if(itemClickHandler){

            dispatch({
                type: actions.ITEM_CLICK,
                itemClickHandler: itemClickHandler,
                target: event.target
            })

        }

    };

    /*TOUCH EVENTS*/
    const onTouchStart = (event) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        dispatch({
            type: actions.POINTER_DOWN,
            listRef: listRef,
            pageX: touches.pageX,
            pageY: touches.pageY
        });

    };

    const onTouchMove = (event) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        dispatch({
            type: actions.POINTER_MOVE,
            pageX: touches.pageX,
            pageY: touches.pageY
        });

    };

    const onTouchEnd = (event) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        dispatch({
            type: actions.POINTER_UP,
            pageX: touches.pageX,
            pageY: touches.pageY
        });

    };


    /*RENDER*/
    const getItems = () => {

        console.log("get scroller items", isNeedScroller);

        return items.map((value, index) => {

            return (
                <li
                    key={classes.Item + index}
                    className={classes.Item}
                    ref={itemRef}
                    data-index={index}
                >
                    <Card onClick={onItemClick} index={index}/>
                </li>
            );

        });

    };


    let finalListStyle = {justifyContent: "center"};
    let mouseDownHandler = null;
    let touchStartHandler = null;
    let touchMoveHandler = null;
    let touchEndHandler = null;

    if(isNeedScroller){

        finalListStyle = {
            ...listStyle,
            transform: 'translateX(' + translateX + 'px)'
        };

        mouseDownHandler = onMouseDown;
        touchStartHandler = onTouchStart;
        touchMoveHandler = onTouchMove;
        touchEndHandler = onTouchEnd;

    }

    return (

        <div
            className={classes.Scroller}
            ref={containerRef}
        >

            <ul
                ref={listRef}
                className={classes.ItemsList}
                onMouseDown={mouseDownHandler}

                onTouchStart={touchStartHandler}
                onTouchMove={touchMoveHandler}
                onTouchEnd={touchEndHandler}

                style={finalListStyle}
            >

                { useMemo(getItems, [items, isNeedScroller]) }

            </ul>

        </div>
            
    );
};

export default Scroller;
        