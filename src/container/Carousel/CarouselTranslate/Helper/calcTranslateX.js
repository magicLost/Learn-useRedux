class CalcTranslateX {

    //itemsLength: itemsLength,

    prevPageX = 0;
    pageXStart = 0;
    pageYStart = 0;

    isYScroll = false;
    isFirstMove = true;

    translateX = 0;

    onPointerDown = (pageX, pageY) => {

        this.pageXStart = pageX;
        this.pageYStart = pageY;
        this.prevPageX = pageX;


    };

    onPointerMove = (pageX, pageY, activeIndex, itemsLength) => {

        //console.log("onPointerMove");

        if(this.isFirstMove){

            this.isYScroll = this.isYScrollFunc(pageX, pageY);

            this.isFirstMove = false;

        }

        if(this.isYScroll) return ;

        this.dist = this.pageXStart - pageX;
        this.translateX += this.calcTranslateX(pageX, activeIndex, itemsLength);

    };

    onPointerUp = () => {

        this.isYScroll = false;
        this.isFirstMove = true;

        this.translateX = 0;

    };


    calcTranslateX = (pageX, activeIndex, itemsLength) => {

        let translateX = 0;
    
        if(activeIndex === 0){
    
            if(this.pageXStart - pageX < 0){
    
                if(pageX > this.prevPageX){
    
                    translateX += 0.3;
    
                }else{
    
                    translateX -= 0.3;
    
                }
    
            }else{
    
                translateX = pageX - this.prevPageX;
    
            }
    
        }else if(activeIndex === itemsLength - 1){
    
            if(this.pageXStart - pageX > 0){
    
                if(pageX > this.prevPageX){
    
                    translateX += 0.3;
    
                }else{
    
                    translateX -= 0.3;
    
                }
    
            }else{
    
                translateX = pageX - this.prevPageX;
    
            }
    
        }else{
    
            translateX = pageX - this.prevPageX;
    
        }
    
        this.prevPageX = pageX;
    
        return translateX;
    
    };

    getTranslateX = (activeIndex, translateX) => {

        const translateByActiveIndex = - activeIndex * 100 + '%';
    
        return  'calc(' + translateByActiveIndex + " + " + translateX + 'px)';
    
    };

    isIndexIncrease = () => {

        return this.dist > 0;

    };

    isEnougthDist = () => {

        return Math.abs(this.dist) > 25;

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