import React, {useRef, useMemo, useEffect} from 'react';
import classes from './ZScroller.module.scss';
import { useZScroller } from '../../hooks/ZScroller/zscroller';

import EventTyper, { EVENT_TYPE } from './Model/EventTyper';
import CalcTranslateX from './Model/CalcTranslateX';
import ZScrollerView from './View/ZScrollerView';
import ZScrollerController from './Controller/ZScrollerController';

        
const ZScroller = ({items, itemClickHandler, getItem}) => {

    //console.log(ctrl);

    const [ controller, translateX, isNeedScroller ]
     = 
    useZScroller(    
        new ZScrollerController(
            new ZScrollerView(), 
            new CalcTranslateX(), 
            new EventTyper()
        )
    );

    useEffect(() => {

        console.log("useEffect");

        console.log(controller.containerRef);
        console.log(controller.listRef);
        console.log(controller.itemRef);

        window.addEventListener('resize', controller.onWindowResize, false);
        controller.init();

    }, []);

    //console.log(controller);

    controller.containerRef = useRef(null);
    controller.listRef = useRef(null); 
    controller.itemRef = useRef(null);
    controller.numberOfItems = items.length;

    const onItemClick = (event) => {

        //console.log("onItemClick ");

        const target = event.target;
        //console.log("itemClickHandler start", state.eventType, state.isNeedScroller);
    
        if(isNeedScroller){
    
            if(controller.eventType === EVENT_TYPE.CLICK){
    
                //console.log("itemClickHandler eval", state.eventType);
                itemClickHandler(target);
    
            }
    
        }else{
    
            itemClickHandler(target);
    
        }
    
    };

    //const item = controller.getItem(classes.Item);

    console.log("zscroller render", controller);

     /*RENDER*/

    let finalListStyle = {justifyContent: "center"};
    let mouseDownHandler = null;
   /*  let touchStartHandler = null;
    let touchMoveHandler = null;
    let touchEndHandler = null; */

    if(isNeedScroller){

        finalListStyle = {
            ...controller.listStyle,
            transform: 'translateX(' + translateX + 'px)'
        };

        mouseDownHandler = controller.onMouseDown;
       /* touchStartHandler = controller.onTouchStart;
        touchMoveHandler = controller.onTouchMove;
        touchEndHandler = controller.onTouchEnd;

        onTouchStart={touchStartHandler}
                onTouchMove={touchMoveHandler}
                onTouchEnd={touchEndHandler} */

    }

    return (

        <div
            className={classes.ZScroller}
            ref={controller.containerRef}
        >

            <ul
                ref={controller.listRef}
                className={classes.ItemsList}
                onMouseDown={mouseDownHandler}

                

                style={finalListStyle}
            >

                { useMemo(() => (controller.getItems(items, getItem, onItemClick, classes.Item)), [items, isNeedScroller]) }

            </ul>

        </div>
        
    );
};

export default ZScroller;
        