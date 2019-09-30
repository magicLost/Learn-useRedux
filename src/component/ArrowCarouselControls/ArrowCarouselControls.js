import React from 'react';
import classes from './ArrowCarouselControls.module.scss';
import icons from "../../../static/icons/ICONS.svg";
        
const arrowCarouselControls = ({activeIndex, increaseActiveIndex, decreaseActiveIndex, length, arrowSizeClass}) => {

    const rightArrowClasses = [ classes.RightArrow, arrowSizeClass ].join(' ');
    const leftArrowClasses = [ classes.LeftArrow, arrowSizeClass ].join(' ');

    const leftArrowStyle = activeIndex <= 0 ?{ visibility: "hidden" } : null;
    const rightArrowStyle = activeIndex >= length - 1 ? { visibility: "hidden" } : null;

    return (
        
        <div className={classes.ArrowCarouselControls}>

            <button
                className={leftArrowClasses}
                onClick={decreaseActiveIndex}
                style={ leftArrowStyle }
            >

                <svg
                    className={classes.LeftSvg}
                    width={"10"}
                    height={"10"}
                    viewBox="0 0 984 991.55"
                >
                    <use xlinkHref={icons + "#arrow"}></use>
                </svg>

            </button>

            <button
                className={rightArrowClasses}
                onClick={increaseActiveIndex}
                style={ rightArrowStyle }
            >

                <svg
                    className={classes.RightSvg}
                    width={"10"}
                    height={"10"}
                    viewBox="0 0 984 991.55"
                >
                    <use xlinkHref={icons + "#arrow"}></use>
                </svg>

            </button>

        </div>
            
    );
};

export default arrowCarouselControls;
        