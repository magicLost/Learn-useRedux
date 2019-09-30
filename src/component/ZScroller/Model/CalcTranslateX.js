import { clamp } from "../../../helper/MathF";

class CalcTranslateX {

    isYScroll = false;
    isFirstMove = true;

    numberOfItems = 0;

    listWidth = 0;
    itemWidth = 0;

    swipeDist = 0;

    //translateXDifferencial = 0;

    minTranslateOffset = 0;
    maxTranslateOffset = 0;

    //checkClickTranslateX = 0;

    pageXStart = 0;
    pageYStart = 0;
    prevPageX = 0;
    pageX = 0;

    translateX = 0;


    setValues = (listRef, itemRef, numberOfItems) => {

        this.numberOfItems = numberOfItems;

        this.listWidth = listRef.current.getBoundingClientRect().width;
        this.itemWidth = itemRef.current.getBoundingClientRect().width;

        this.setTranslateOffsets();

        this.swipeDist = Math.round(this.itemWidth * this.numberOfItems / 10);

        /* console.log("minTranslateOffset = " + this.minTranslateOffset);
         console.log("maxTranslateOffset = " + this.maxTranslateOffset);
         console.log("listWidth = " + this.listWidth);
         console.log("itemWidth = " + this.itemWidth);*/


    };

    onPointerDown = (pageX, pageY, listRef) => {

        this.pageXStart = pageX;
        this.pageYStart = pageY;
        this.prevPageX = pageX;

        this.translateX = listRef.current.getBoundingClientRect().x -  Math.abs(this.offsetX);

    };

    onPointerMove = (pageX, pageY) => {

        

        if(this.isFirstMove){
    
            this.isYScroll = this.isYScrollFunc(pageX, pageY);

            this.isFirstMove = false;

        }

    };

    onPointerUp = () => {

        this.isFirstMove = true;
        this.isYScroll = false;

    }

    setTranslateOffsets = () => {

        this.maxTranslateOffset = 0;
        this.minTranslateOffset = this.listWidth - this.itemWidth * this.numberOfItems;

    };

    isOutsideOffset = (translateX) => {

        return translateX > this.maxTranslateOffset || translateX < this.minTranslateOffset;

    };

    calcTranslateXOnMove = (stateTranslateX, pageX) => {

        let translateX = 0;

        if(stateTranslateX > this.maxTranslateOffset){

            if(pageX > this.prevPageX){

                translateX += 0.3;

            }else{

                //translateX -= 0.3;
                translateX = pageX - this.prevPageX;

            }

        }else if(stateTranslateX < this.minTranslateOffset){

            if(pageX > this.prevPageX){

                //translateX += 0.3;
                translateX = pageX - this.prevPageX;

            }else{

                translateX -= 0.3;


            }

        }else{

            translateX = pageX - this.prevPageX;

        }

        this.prevPageX = pageX;


        translateX = this.translateX + translateX;
        translateX = clamp(translateX, this.minTranslateOffset - 50, this.maxTranslateOffset + 50);

        this.translateX = translateX;
    };

    calcTranslateXOnSwipe = (speed) => {

        let translateX = this.swipeDist * speed;

        translateX = this.translateX + translateX;
        translateX = clamp(translateX, this.minTranslateOffset, this.maxTranslateOffset);

        this.translateX = translateX;

    };

    isNeedScroller = () => {

        return this.itemWidth * this.numberOfItems - this.listWidth > 0;

    };

    isYScrollFunc = (pageX, pageY) => {

        const distX = Math.abs(pageX - this.pageXStart);
        const distY = Math.abs(pageY - this.pageYStart);

        //console.log("distX " + distX);
        //console.log(event);

        return distY > distX;

    };


}

export default CalcTranslateX;