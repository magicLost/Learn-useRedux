
class CalcOpacity {

    pageXStart = 0;
    pageYStart = 0;
    //prevPageX = 0;

    isYScroll = false;
    isFirstMove = true;

    dist = 0;
    delta = 0;

    onPointerDown = (pageX, pageY) => {

        this.pageXStart = pageX;
        this.pageYStart = pageY;
        this.delta = document.documentElement.clientWidth / 100;
        this.dist = 0;

    };

    onPointerMove = (pageX, pageY) => {

        //if(!state.isTranslated || state.isYScroll) return;

        console.log("onPointerMove");

        if(this.isFirstMove){

            this.isYScroll = this.isYScrollFunc(pageX, pageY);

            this.isFirstMove = false;

        }

        if(this.isYScroll) return ;

        this.dist = this.pageXStart - pageX;
        //opacity = 1 - Math.abs(Math.round(dist / state.delta)) / 100;

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

    calcOpacity = () => {

        return 1 - Math.abs(Math.round(this.dist / this.delta)) / 100;

    };

}

export default CalcOpacity;