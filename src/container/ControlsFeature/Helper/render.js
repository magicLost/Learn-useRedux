import React from 'react';
import { getDegrees, getTranslateByCircle } from "./tech";
import { type } from '../ControlsFeature';




export const getMainItem = (
        itemMainClass, 
        ItemMainTextClass,
        svgClass,
        mainItemTouchMoveHandler,
        isShowTitle,
        isMainItemText,
        mainItemText,
        icons,
        mainItemStyle,
        mainItemsMouseDownHandler,
        mainItemTouchStartHandler, 
        mainItemTouchEndHandler
     ) => {

    let mainItemContent = '';
    let className = itemMainClass;
    let onTouchMove = isShowTitle ? mainItemTouchMoveHandler : null;

    if(isMainItemText === true){

        mainItemContent = mainItemText;
        className = ItemMainTextClass;

    }else{
        mainItemContent = (
            <svg
                className={svgClass}
                width="5"
                height={"5"}
            >
                <use  xlinkHref={ icons + "#more" }/>
            </svg>
        )
    }

    return (

        <div
            className={className}
            onMouseDown={mainItemsMouseDownHandler}
            onTouchStart={mainItemTouchStartHandler}
            onTouchEnd={mainItemTouchEndHandler}
            onTouchMove={onTouchMove}
            style={mainItemStyle}
        >
            { mainItemContent }
        </div>

    );

};

export const getTitle = (isShowTitle, ttitleStyle, title, titleClass) => {

    let titleStyle = null;

    if(isShowTitle){

        titleStyle = {...ttitleStyle};

        if(title !== ''){

            titleStyle.opacity = 1;
            //title = this.state.title;

        }

        return (

            <div
                style={titleStyle}
                className={titleClass}
            >
                <p>{ title }</p>
            </div>

        );

    }

    return null;

};

export const getItems = (
    items, 
    icons, 
    isShowItems, 
    isShowTitle, 

    itemType, 
    formType,
    configFeature,

    classItem, 
    classItemText, 
    itemSvgClass, 
    labelClass,

    itemMouseEnter, 
    itemMouseLeave, 
    itemMouseUpHandler
    ) => {

    let itemClass = classItem;
    let style = null;

    let onMouseEnter = null;
    let onMouseLeave = null;

    if(itemType === type.TEXT){
        itemClass = classItemText;
    }

    if(isShowItems && isShowTitle){

        onMouseEnter = itemMouseEnter;
        onMouseLeave = itemMouseLeave;

    }

    

    return items.map((value, index) => {

        
        if(isShowItems){

            //index, ttype, fformType, itemsLength, degreesAll, itemsLengthForDegreesCalc, degreesMarga
            let degrees = getDegrees(
                index,
                itemType,
                formType,
                configFeature.itemsLength,
                configFeature.degreesAll,
                configFeature.itemsLengthForDegreesCalc,
                configFeature.degreesMarga
            );

            //radius, degrees
            let translate = getTranslateByCircle(configFeature.radius, degrees);

            //console.log("translate ", translate);

            style = { transform: translate, opacity: 1 };
            //style.boxShadow = "0 10px 18px rgba(0,0,0,0.25), 0 6px 6px rgba(0,0,0,0.22)";
            style.boxShadow = "0 1px 5px 0 rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)";

        }

        

        if(itemType === type.TEXT){

            return getTextItem(itemClass, labelClass, value, index, style, onMouseEnter, onMouseLeave, itemMouseUpHandler);
        }else{

            return getSvgItem(icons, itemClass, itemSvgClass, value, index, style, onMouseEnter, onMouseLeave, itemMouseUpHandler);

        }

    });

};

const getTextItem = (itemClass, labelClass, value, index, style, onMouseEnter, onMouseLeave, itemMouseUpHandler) => (

    <div
        key={itemClass + index}
        className={itemClass}

        data-feature-name={value}
        data-index={index}

        onMouseUp={itemMouseUpHandler}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}

        style={style}
    >
        <p
            data-name={value}
            data-index={index}
            className={labelClass}
        >
            {value}
        </p>

    </div>
);

const getSvgItem = (icons, itemClass, itemSvgClass, value, index, style, onMouseEnter, onMouseLeave, itemMouseUpHandler) => (

    <div
        key={itemClass + index}
        className={itemClass}

        data-feature-name={value.title}
        data-index={index}

        onMouseUp={itemMouseUpHandler}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}

        style={style}
    >
        <svg
            className={itemSvgClass}
            width="5"
            height={"5"}
            data-feature-name={value.title}
            data-index={index}
        >
            <use data-index={index} data-feature-name={value.title}  xlinkHref={icons + value.href}/>
        </svg>
    </div>

);


/* const getMainItem = () => {

    let mainItemContent = '';
    let className = classes.ItemMain;
    let onTouchMove = isShowTitle ? mainItemTouchMoveHandler : null;

    if(isMainItemText === true){

        mainItemContent = mainItemText;
        className = classes.ItemMainText;

    }else{
        mainItemContent = (
            <svg
                className={classes.Svg}
                width="5"
                height={"5"}
            >
                <use  xlinkHref={ icons + "#hamburger" }/>
            </svg>
        )
    }

    return (

        <button
            className={className}
            onMouseDown={mainItemsMouseDownHandler}
            onTouchStart={mainItemTouchStartHandler}
            onTouchEnd={mainItemTouchEndHandler}
            onTouchMove={onTouchMove}
            style={config.mainItemStyle}
        >
            { mainItemContent }
        </button>

    );

};

const getTitle = () => {

    let titleStyle = null;

    if(isShowTitle){

        titleStyle = {...configFeature.titleStyle};

        if(title !== ''){

            titleStyle.opacity = 1;
            //title = this.state.title;

        }

        return (

            <div
                style={titleStyle}
                className={classes.Title}
            >
                <p>{ title }</p>
            </div>

        );

    }

    return null;

};

const getItems = () => {

    let itemClass = classes.Item;
    let style = null;

    let onMouseEnter = null;
    let onMouseLeave = null;

    if(type === type.TEXT){
        itemClass = classes.ItemText;
    }

    if(isShowItems && isShowTitle){

        onMouseEnter = itemMouseEnter;
        onMouseLeave = itemMouseLeave;

    }

    return items.map((value, index) => {

        if(isShowItems){

            let degrees = getDegrees(index);

            let translate = getTranslateByCircle(degrees);

            style = { transform: translate, opacity: 1 };
            style.boxShadow = "0 10px 18px rgba(0,0,0,0.25), 0 6px 6px rgba(0,0,0,0.22)";

        }

        if(type === type.TEXT){
            return getTextItem(itemClass, value, index, style, onMouseEnter, onMouseLeave, itemMouseUpHandler);
        }else{

            return getSvgItem(itemClass, value, index, style, onMouseEnter, onMouseLeave, itemMouseUpHandler);

        }

    });

};

const getTextItem = (itemClass, value, index, style, onMouseEnter, onMouseLeave, itemMouseUpHandler) => (

    <div
        key={itemClass + index}
        className={itemClass}

        data-name={value}
        data-index={index}

        onMouseUp={itemMouseUpHandler}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}

        style={style}
    >
        {value}
    </div>
);

const getSvgItem = (itemClass, value, index, style, onMouseEnter, onMouseLeave, itemMouseUpHandler) => (

    <div
        key={itemClass + index}
        className={itemClass}

        data-name={value.title}
        data-index={index}

        onMouseUp={itemMouseUpHandler}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}

        style={style}
    >
        <svg
            className={classes.ItemSvg}
            width="5"
            height={"5"}
            data-name={value.title}
        >
            <use data-index={index} data-name={value.title}  xlinkHref={icons + value.href}/>
        </svg>
    </div>

); */