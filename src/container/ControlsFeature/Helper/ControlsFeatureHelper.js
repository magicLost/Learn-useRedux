import icons from "./../../../static/icons/ICONS.svg";
import { type } from "../ControlsFeature";
import { getDegrees, getTranslateByCircle } from "./tech";
import React from 'react';


export const formType = {

    CIRCLE: "CIRCLE",

    TOP_HALF_CIRCLE: 'TOP_HALF_CIRCLE',
    BOTTOM_HALF_CIRCLE: 'BOTTOM_HALF_CIRCLE',
    RIGHT_HALF_CIRCLE: 'RIGHT_HALF_CIRCLE',
    LEFT_HALF_CIRCLE: 'LEFT_HALF_CIRCLE',

    TOP_RIGHT_QUARTER: "TOP_RIGHT_QUARTER",
    TOP_LEFT_QUARTER: "TOP_LEFT_QUARTER",
    BOTTOM_RIGHT_QUARTER: "BOTTOM_RIGHT_QUARTER",
    BOTTOM_LEFT_QUARTER: "BOTTOM_LEFT_QUARTER",

};

class ControlsFeatureHelper {

   /*  isShowTitle = true;
    isMainItemText = false; */
    classes = null;
    config = null;

    itemsLength = 0;
    itemsLengthForDegreesCalc = 0;

    radius = 100;
    degreesAll = 90;
    degreesMarga = 270;
    topRightBgClasses = ' ';
    topLeftBgClasses = ' ';
    bottomRightBgClasses = ' ';
    bottomLeftBgClasses = '';
    hiddenBgClass = '';

    titleStyle = {
        top: '0',
        left: '-210px',
        transformOrigin: 'top left',
        transform: 'rotate(45deg)'
    }

    constructor(itemsLength, classes, config){

        this.classes = classes;
        this.config = config;

        this.topRightBgClasses = classes.TopRight;
        this.topLeftBgClasses = classes.TopLeft;
        this.bottomRightBgClasses = classes.BottomRight;
        this.bottomLeftBgClasses = classes.BottomLeft;
        this.hiddenBgClass = classes.Hidden;

        this.itemsLength = itemsLength;
        this.itemsLengthForDegreesCalc = this.itemsLength - 1;

        this.init();

    }

    getBgStyle = (isShowItems) => {

        if(isShowItems) 
            return {
                transform: 'scale(10.5, 10.5)',
                opacity: 1,
            };

        return null;
    };

    getTitleElement = (isShowItems, title) => {

        if(isShowItems) 
            return this.getTitle(isShowItems, title);

        return null;

    };

    getTitle = (isShowItems, title) => {

        let titleStyle = null;

        if(isShowItems && this.config.isShowTitle){
    
            titleStyle = {...this.titleStyle};
    
            if(title !== ''){
    
                titleStyle.opacity = 1;
                //title = this.state.title;
    
            }
    
            return (
    
                <div
                    style={titleStyle}
                    className={this.classes.Title}
                >
                    <p>{ title }</p>
                </div>
    
            );
    
        }
    
        return null;

    };

    getMainItem = (mainItemTouchMoveHandler, mainItemText, mainItemsMouseDownHandler, mainItemTouchStartHandler, mainItemTouchEndHandler) => {

        let mainItemContent = '';
        let className = this.classes.ItemMain;
        let onTouchMove = this.config.isShowTitle ? mainItemTouchMoveHandler : null;

        if(this.config.isMainItemText === true){

            mainItemContent = mainItemText;
            className = this.classes.ItemMainText;

        }else{
            mainItemContent = (
                <svg
                    className={this.classes.Svg}
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
                style={this.config.mainItemStyle}
            >
                { mainItemContent }
            </div>

        );

    };

    getItems = ( items, isShowItems, itemMouseEnter, itemMouseLeave, itemMouseUpHandler) => {
    
        let itemClass = this.classes.Item;
        let style = null;
    
        let onMouseEnter = null;
        let onMouseLeave = null;
    
        if(this.config.type === type.TEXT){
            itemClass = this.classes.ItemText;
        }
    
        if(isShowItems && this.config.isShowTitle){
    
            onMouseEnter = itemMouseEnter;
            onMouseLeave = itemMouseLeave;
    
        }
    
        
    
        return items.map((value, index) => {
    
            
            if(isShowItems){
    
                //index, ttype, fformType, itemsLength, degreesAll, itemsLengthForDegreesCalc, degreesMarga
                let degrees = getDegrees(
                    index,
                    this.config.type,
                    this.config.formType,
                    this.itemsLength,
                    this.degreesAll,
                    this.itemsLengthForDegreesCalc,
                    this.degreesMarga
                );
    
                //radius, degrees
                let translate = getTranslateByCircle(this.radius, degrees);
    
                //console.log("translate ", translate);
    
                style = { transform: translate, opacity: 1 };
                //style.boxShadow = "0 10px 18px rgba(0,0,0,0.25), 0 6px 6px rgba(0,0,0,0.22)";
                style.boxShadow = "0 1px 5px 0 rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)";
    
            }
    
            
    
            if(this.config.type === type.TEXT){
    
                return this.getTextItem(itemClass, value, index, style, onMouseEnter, onMouseLeave, itemMouseUpHandler);
            }else{
    
                return this.getSvgItem(itemClass, value, index, style, onMouseEnter, onMouseLeave, itemMouseUpHandler);
    
            }
    
        });
    
    };

    getTextItem = (itemClass, value, index, style, onMouseEnter, onMouseLeave, itemMouseUpHandler) => (

        <div
            key={itemClass + index}
            className={itemClass}
    
            data-feature-name={value}
            data-feature-index={index}
    
            onMouseUp={itemMouseUpHandler}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
    
            style={style}
        >
            <p
                data-feature-name={value}
                data-feature-index={index}
                className={this.classes.Label}
            >
                {value}
            </p>
    
        </div>
    );
    
    getSvgItem = (itemClass, value, index, style, onMouseEnter, onMouseLeave, itemMouseUpHandler) => (
    
        <div
            key={itemClass + index}
            className={itemClass}
    
            data-feature-name={value.title}
            data-feature-index={index}
    
            onMouseUp={itemMouseUpHandler}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
    
            style={style}
        >
            <svg
                className={this.classes.ItemSvg}
                width="5"
                height={"5"}
                data-feature-name={value.title}
                data-feature-index={index}
            >
                <use data-feature-index={index} data-feature-name={value.title}  xlinkHref={icons + value.href}/>
            </svg>
        </div>
    
    ); 

    init = () => {

        switch(this.config.formType){
    
            case formType.CIRCLE:
    
                this.degreesAll = 360;
                this.itemsLengthForDegreesCalc = this.itemsLength;
                this.titleStyle = { top: '-160px', left: '-150px'};

                break;

             /*    return {
    
                    degreesAll: 360,
                    degreesMarga: 0,
                    topRightBgClasses: topRightClass,
                    topLeftBgClasses: topLeftClass,
                    bottomRightBgClasses: bottomRightClass,
                    bottomLeftBgClasses: bottomLeftClass,
    
                    titleStyle: { top: '-160px', left: '-150px' }
    
                }; */
    
            case formType.TOP_HALF_CIRCLE:
    
                this.degreesAll = 180;
                this.degreesMarga = 90;
                this.bottomLeftBgClasses += ' ' + this.hiddenBgClass;
                this.bottomRightBgClasses += ' ' + this.hiddenBgClass;
                this.titleStyle = { top: '-160px', left: '-150px'};

                break;

               /*  return {
    
                    degreesAll: 180,
                    degreesMarga: 90,
                    topRightBgClasses: topRightClass,
                    topLeftBgClasses: topLeftClass,
                    bottomRightBgClasses: bottomRightClass + ' ' + hiddenClass,
                    bottomLeftBgClasses: bottomLeftClass + ' ' + hiddenClass,
    
                    titleStyle: { top: '-160px', left: '-150px' }
    
                }; */
    
            case formType.BOTTOM_HALF_CIRCLE:
    
                this.degreesAll = 180;
                this.degreesMarga = 270;
                this.topLeftBgClasses += ' ' + this.hiddenBgClass;
                this.topRightBgClasses += ' ' + this.hiddenBgClass;
                this.titleStyle = { top: '150px', left: '-150px'};

                break;

                /* return {
    
                    degreesAll: 180,
                    degreesMarga: 270,
                    topRightBgClasses: topRightClass + ' ' + hiddenClass,
                    topLeftBgClasses: topLeftClass + ' ' + hiddenClass,
                    bottomRightBgClasses: bottomRightClass,
                    bottomLeftBgClasses: bottomLeftClass,
    
                    titleStyle: { top: '150px', left: '-150px'}
    
                }; */
    
            case formType.RIGHT_HALF_CIRCLE:
    
                this.degreesAll = 180;
                this.degreesMarga = 0;
                this.bottomLeftBgClasses += ' ' + this.hiddenBgClass;
                this.topLeftBgClasses += ' ' + this.hiddenBgClass;

                this.titleStyle = {
                    top: '-170px',
                    left: '120px',
                    transformOrigin: 'top left',
                    transform: 'rotate(60deg)'
                };

                break;

                /* return {
    
                    degreesAll: 180,
                    degreesMarga: 0,
                    topRightBgClasses: topRightClass,
                    topLeftBgClasses: topLeftClass + ' ' + hiddenClass,
                    bottomRightBgClasses: bottomRightClass,
                    bottomLeftBgClasses: bottomLeftClass + ' ' + hiddenClass,
    
                    titleStyle: {
                        top: '-170px',
                        left: '120px',
                        transformOrigin: 'top left',
                        transform: 'rotate(60deg)'
                    }
    
                }; */
    
            case formType.LEFT_HALF_CIRCLE:
    
                this.degreesAll = 180;
                this.degreesMarga = 180;
                this.topRightBgClasses += ' ' + this.hiddenBgClass;
                this.bottomRightBgClasses += ' ' + this.hiddenBgClass;

                this.titleStyle = {
                    top: '-170px',
                    left: '-410px',
                    transformOrigin: 'top right',
                    transform: 'rotate(-60deg)'
                };

                break;

                /* return {
    
                    degreesAll: 180,
                    degreesMarga: 180,
                    topRightBgClasses: topRightClass + ' ' + hiddenClass,
                    topLeftBgClasses: topLeftClass,
                    bottomRightBgClasses: bottomRightClass + ' ' + hiddenClass,
                    bottomLeftBgClasses: bottomLeftClass,
    
                    titleStyle: {
                        top: '-170px',
                        left: '-410px',
                        transformOrigin: 'top right',
                        transform: 'rotate(-60deg)'
                    }
    
                }; */
    
            case formType.TOP_RIGHT_QUARTER:
    
                this.degreesAll = 90;
                this.degreesMarga = 90;
                this.topLeftBgClasses += ' ' + this.hiddenBgClass;
                this.bottomRightBgClasses += ' ' + this.hiddenBgClass;
                this.bottomLeftBgClasses += ' ' + this.hiddenBgClass;

                this.titleStyle = {
                    top: '-235px',
                    left: '30px',
                    transformOrigin: 'top left',
                    transform: 'rotate(45deg)'
                };

                break;

                /* return {
    
                    degreesAll: 90,
                    degreesMarga: 90,
                    topRightBgClasses: topRightClass,
                    topLeftBgClasses: topLeftClass + ' ' + hiddenClass,
                    bottomRightBgClasses: bottomRightClass + ' ' + hiddenClass,
                    bottomLeftBgClasses: bottomLeftClass + ' ' + hiddenClass,
    
                    titleStyle: {
                        top: '-235px',
                        left: '30px',
                        transformOrigin: 'top left',
                        transform: 'rotate(45deg)'
                    }
    
                }; */
    
            case formType.TOP_LEFT_QUARTER:
    
                this.degreesAll = 90;
                this.degreesMarga = 180;
                this.topRightBgClasses += ' ' + this.hiddenBgClass;
                this.bottomRightBgClasses += ' ' + this.hiddenBgClass;
                this.bottomLeftBgClasses += ' ' + this.hiddenBgClass;

                this.titleStyle = {
                    top: '-30px',
                    left: '-235px',
                    transformOrigin: 'top left',
                    transform: 'rotate(-45deg)'
                };

                break;


                /* return {
    
                    degreesAll: 90,
                    degreesMarga: 180,
                    topRightBgClasses: topRightClass + ' ' + hiddenClass,
                    topLeftBgClasses: topLeftClass,
                    bottomRightBgClasses: bottomRightClass + ' ' + hiddenClass,
                    bottomLeftBgClasses: bottomLeftClass + ' ' + hiddenClass,
    
                    titleStyle: {
                        top: '-30px',
                        left: '-235px',
                        transformOrigin: 'top left',
                        transform: 'rotate(-45deg)'
                    }
    
                }; */
    
            case formType.BOTTOM_RIGHT_QUARTER:
    

                this.degreesAll = 90;
                this.degreesMarga = 0;
                this.topRightBgClasses += ' ' + this.hiddenBgClass;
                this.topLeftBgClasses += ' ' + this.hiddenBgClass;
                this.bottomLeftBgClasses += ' ' + this.hiddenBgClass;

                this.titleStyle = {
                    top: '210px',
                    left: '0',
                    transformOrigin: 'top left',
                    transform: 'rotate(-45deg)'
                };

                break;

                /* return {
    
                    degreesAll: 90,
                    degreesMarga: 0,
                    topRightBgClasses: topRightClass + ' ' + hiddenClass,
                    topLeftBgClasses: topLeftClass + ' ' + hiddenClass,
                    bottomRightBgClasses: bottomRightClass,
                    bottomLeftBgClasses: bottomLeftClass + ' ' + hiddenClass,
    
                    titleStyle: {
                        top: '210px',
                        left: '0',
                        transformOrigin: 'top left',
                        transform: 'rotate(-45deg)'
                    }
    
                }; */
    
            case formType.BOTTOM_LEFT_QUARTER:
    
                this.degreesAll = 90;
                this.degreesMarga = 270;
                this.topRightBgClasses += ' ' + this.hiddenBgClass;
                this.topLeftBgClasses += ' ' + this.hiddenBgClass;
                this.bottomRightBgClasses += ' ' + this.hiddenBgClass;

                this.titleStyle = {
                    top: '0',
                    left: '-210px',
                    transformOrigin: 'top left',
                    transform: 'rotate(45deg)'
                };

                break;

                /* return {
    
                    degreesAll: 90,
                    degreesMarga: 270,
                    topRightBgClasses: topRightClass + ' ' + hiddenClass,
                    topLeftBgClasses: topLeftClass + ' ' + hiddenClass,
                    bottomRightBgClasses: bottomRightClass + ' ' + hiddenClass,
                    bottomLeftBgClasses: bottomLeftClass,
    
                    titleStyle: {
                        top: '0',
                        left: '-210px',
                        transformOrigin: 'top left',
                        transform: 'rotate(45deg)'
                    }
    
                }; */
    
            default: console.error("Unknown form type == " + type); break;
        }
    
    };
    

}

export default ControlsFeatureHelper;