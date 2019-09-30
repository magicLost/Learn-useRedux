import React from 'react';
import classes from './ControlsFeature.module.scss';
import { useControlsFeature, actions } from '../../hooks/ControlsFeature/controlsFeature';
//import FeatureConfig from './Helper/FeatureConfig';


//import { getMainItem, getTitle, getItems } from './Helper/render';
import ControlsFeatureHelper from './Helper/ControlsFeatureHelper';
//import icons from "./../../static/icons/ICONS.svg";



export const type = {

    TEXT: "TEXT",
    SVG: "SVG"

};
        
/* configuration={{
    type: type.TEXT,
    formType: formType.BOTTOM_HALF_CIRCLE,
    isShowTitle: false,
    isMainItemText: false,
    mainDivStyle: { top: 0 },
    mainItemStyle: { backgroundColor: "white" }
}} */
const ControlsFeature = ({items, itemClickHandler,  configuration}) => {

    //type, itemsLength, topRightClass, topLeftClass, bottomRightClass, bottomLeftClass, hiddenClass
    const [ helper, isShowItems, title, mainItemText, dispatch] = 
        useControlsFeature(new ControlsFeatureHelper(
            items.length,
            classes,
            configuration         
        ));


    const onMainItemMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();

        window.addEventListener('mouseup', onWindowMouseUp, false);
        dispatch({type: actions.MAIN_ITEM_MOUSE_DOWN});

    };
    
    const onMainItemTouchStart = (event) => {
        event.preventDefault();
        event.stopPropagation();
    
        dispatch({type: actions.MAIN_ITEM_TOUCH_START});
        
    };
    
    const onMainItemTouchMove = (event) => {
    
        event.preventDefault();
        event.stopPropagation();

        const touch = event.changedTouches[0];

        const target = document.elementFromPoint(touch.clientX, touch.clientY);
    
        dispatch({type: actions.MAIN_ITEM_TOUCH_MOVE, target: target});

    };
    
    const onMainItemTouchEnd = (event) => {
    
        event.preventDefault();
        event.stopPropagation();
    
        const touch = event.changedTouches[0];

        const target = document.elementFromPoint(touch.clientX, touch.clientY);

        dispatch({
            type: actions.MAIN_ITEM_TOUCH_END, 
            target: target,
            itemClickHandler: itemClickHandler,
            isMainItemText: configuration.isMainItemText,
            items: items,
            itemType: configuration.type
        });

    };
    
    const onItemMouseUp = (event) => {
    
        event.preventDefault();
        event.stopPropagation();

        console.log("onItemMouseUp ", event.target);

        window.removeEventListener('mouseup', onWindowMouseUp, false);

        dispatch({
            type: actions.ITEM_MOUSE_UP, 
            target: event.target,
            itemClickHandler: itemClickHandler,
            isMainItemText: configuration.isMainItemText,
            items: items,
            itemType: configuration.type
        });
    
    };
    
    const onItemMouseEnter = (event) => {
    
        event.preventDefault();
        event.stopPropagation();

        dispatch({type: actions.ITEM_MOUSE_ENTER, target: event.target});
    
    };
    
    const onItemMouseLeave = (event) => {
    
        event.preventDefault();
        event.stopPropagation();
    
        dispatch({type: actions.ITEM_MOUSE_LEAVE, target: event.target});
    };
    
    const onWindowMouseUp = (event) => {
    
        event.preventDefault();
        event.stopPropagation();

        window.removeEventListener('mouseup', onWindowMouseUp, false);
        dispatch({type: actions.WINDOW_MOUSE_UP});
    
    };


    let titleElement = helper.getTitleElement(isShowItems, title);
    let bgStyle = helper.getBgStyle(isShowItems);

    //
    const mainItem = helper.getMainItem(
        onMainItemTouchMove,
        mainItemText,
        onMainItemMouseDown,
        onMainItemTouchStart, 
        onMainItemTouchEnd
    );

    //isShowItems, isShowTitle, type, classItem, classItemText, itemMouseEnter, itemMouseLeave, itemMouseUpHandler
    const itemsElements = helper.getItems(
        items,
        isShowItems,
        onItemMouseEnter,
        onItemMouseLeave,
        onItemMouseUp
    );

    console.log("render ControlFeature ", helper, isShowItems, title, mainItemText);

    return (
        
        <div className={classes.ControlsFeature} style={configuration.mainDivStyle}>

        { titleElement }

        <div
            className={classes.ItemBG}
            style={bgStyle}
        >
            <div className={helper.topLeftBgClasses}> </div>
            <div  className={helper.topRightBgClasses}> </div>
            <div  className={helper.bottomLeftBgClasses}> </div>
            <div  className={helper.bottomRightBgClasses}> </div>
        </div>

        { itemsElements }

        { mainItem }

        </div>
            
    );
};

export default ControlsFeature;
        