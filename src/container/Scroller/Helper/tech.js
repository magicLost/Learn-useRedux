
/*CALC TRANSLATE X*/

export const isOutsideOffset = (translateX, maxTranslateOffset, minTranslateOffset) => {

    return translateX > maxTranslateOffset || translateX < minTranslateOffset;

};

export const getTranslateOffsets = (listWidth, itemWidth, numberOfItems) => {

    const minTranslateOffset = listWidth - itemWidth * numberOfItems;

    //max, mig
    return [ 0, minTranslateOffset];

};

export const calcTranslateXOnMove = (stateTranslateX, pageX, prevPageX, maxTranslateOffset, minTranslateOffset) => {

    let translateX = 0;

    if(stateTranslateX > maxTranslateOffset){

        if(pageX > prevPageX){

            translateX += 0.3;

        }else{

            //translateX -= 0.3;
            translateX = pageX - prevPageX;

        }

    }else if(stateTranslateX < minTranslateOffset){

        if(pageX > prevPageX){

            //translateX += 0.3;
            translateX = pageX - prevPageX;

        }else{

            translateX -= 0.3;


        }

    }else{

        translateX = pageX - prevPageX;

    }

    //TODO prevPageX = pageX;


    return translateX;

};

export const calcTranslateXOnSwipe = (speed, swipeDist) => {

    return swipeDist * speed;

};

export const isNeedScroller = (containerWidth, itemWidth, numberOfItems) => {

    return itemWidth * numberOfItems - containerWidth > 0;

};

/*EVENT SORTER*/
export const EVENT_TYPE = {

    CLICK: "CLICK",
    LONG_TAP: "LONG_TAP",
    SWIPE: "SWIPE",
    SWIPE_MOVE: "SWIPE_MOVE",
    MOVE: "MOVE"

};

export const whatEventType = (
    pageY, dist, elapsedTime, allowedTime, threshold, startY, restraint,
    lastFiveXToucheMoveSum, elapsedTimeAfterMove, allowedTimeToMoveSwipe
) => {

    if(dist === 0){

        if(elapsedTime > 200){

            return EVENT_TYPE.LONG_TAP;

        }else{

            return EVENT_TYPE.CLICK;

        }

    }else{

        if(this.isSwipe(pageY, elapsedTime, allowedTime, dist, threshold, startY, restraint)){

            return EVENT_TYPE.SWIPE;

        }else if(this.isSwipeAfterMoving(pageY, lastFiveXToucheMoveSum, startY, restraint, elapsedTimeAfterMove, allowedTimeToMoveSwipe)){

            return EVENT_TYPE.SWIPE_MOVE;

        }

        return EVENT_TYPE.MOVE;

    }

};

export const isSwipe = (pageY, elapsedTime, allowedTime, dist, threshold, startY, restraint) => {

    /*let lastFiveXToucheMoveSum = 0;

    for(let value of lastFiveXTouchMove){

        lastFiveXToucheMoveSum += value;

    }*/

    return  (elapsedTime <= allowedTime && Math.abs(dist) >= threshold && Math.abs(pageY - startY) <= restraint);

};

export const getLastFiveXToucheMoveSum = (lastFiveXTouchMove) => {

    let lastFiveXToucheMoveSum = 0;

    for(let value of lastFiveXTouchMove){

        lastFiveXToucheMoveSum += value;

    }

    return lastFiveXToucheMoveSum;

};

export const isSwipeAfterMoving = (pageY, lastFiveXToucheMoveSum, startY, restraint, elapsedTimeAfterMove, allowedTimeToMoveSwipe) => {

   /* for(let value of this.lastFiveXTouchMove){

        this.lastFiveXToucheMoveSum += value;

    }*/


    return (Math.abs(lastFiveXToucheMoveSum) > 50) && (Math.abs(pageY - startY) <= restraint && elapsedTimeAfterMove <= allowedTimeToMoveSwipe);

};

export const getSwipeSpeed = (lastFiveXToucheMoveSum) => {

    let speed = lastFiveXToucheMoveSum * -1 / 100;

    if(speed > 0){

        if(speed < 1)
            return 1;
        if(speed > 3)
            return 3;

    }else{

        if(speed < -3)
            return -3;
        if(speed > -1)
            return -1;

    }

    return speed;

};