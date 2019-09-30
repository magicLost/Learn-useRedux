import { EVENT_TYPE } from "../Model/EventTyper";

class ZScrollerController {

    view = null;
    calcTranslateX = null;
    eventTyper = null;

    itemRef = null;
    listRef = null;
    containerRef = null;
    //dispatch = null;
    setState = null;

    
    //isNeedScroller = false;
    numberOfItems = 0;
    listStyle = {};
    eventType = '';

    constructor(view, calc, eventTyper){
        this.view = view;
        this.calcTranslateX = calc;
        this.eventTyper = eventTyper;
    }

    init = () => {

        this.calcTranslateX.setValues(this.listRef, this.itemRef, this.numberOfItems);
        this.calcTranslateX.offsetX = this.containerRef.current.getBoundingClientRect().x;//right
    
        const isNeedScroller = this.calcTranslateX.isNeedScroller();
        //setValues(listWidth, itemWidth, numberOfItems, minTranslateOffset, maxTranslateOffset);
    
        this.setState((prevState) => {

            if(prevState.isNeedScroller !== isNeedScroller){
                return { ...prevState, isNeedScroller: isNeedScroller };
            }
        
            return prevState;

        });
        
    
    };

    getTranslateX = () => {

        return this.calcTranslateX.translateX;

    }

    onPointerDown = (pageX, pageY) => {

        this.calcTranslateX.onPointerDown(pageX, pageY, this.listRef);

        this.eventTyper.onTouchStart(pageX, pageY);

        this.listStyle = {};
        this.eventType = '';

        this.setState((prevState) => {

            return {
                ...prevState,
                translateX: this.getTranslateX(),
            }

        });

    }

    onPointerMove = (pageX, pageY) => {

     /*    this.calcTranslateX.onPointerMove(pageX, pageY);
    
        if(!this.calcTranslateX.isYScroll){
    
            this.eventTyper.onTouchMove(pageX);
    
            this.calcTranslateX.calcTranslateXOnMove(this.getTranslateX(), pageX);
    
            this.listRef.current.style = "transform: translateX(" + this.getTranslateX() + "px)"
    
        } */
    
    
        this.calcTranslateX.onPointerMove(pageX, pageY);
    
        this.setState((prevState) => {

            if(!this.calcTranslateX.isYScroll){
    
                this.eventTyper.onTouchMove(pageX);
        
                this.calcTranslateX.calcTranslateXOnMove(prevState.translateX, pageX);
        
                return {
                    ...prevState,
                    translateX: this.getTranslateX(),
                    //isTranslated: true
                };
        
            }
        
            return prevState;

        });
    
    };

    onPointerUp = (pageX, pageY) => {
    
        this.setState((prevState) => {

            if(!this.calcTranslateX.isYScroll){
    
                this.calcTranslateX.onPointerUp();
        
                //what event - move, swipe etc...
                this.eventTyper.onTouchEnd(pageX);
        
                this.eventType = this.eventTyper.whatEventType(pageY);
        
                if(this.eventType === EVENT_TYPE.CLICK){
        
                    return prevState;
        
                }
        
                if(prevState.translateX > this.calcTranslateX.maxTranslateOffset){
        
                    this.calcTranslateX.translateX = this.calcTranslateX.maxTranslateOffset;
        
                }else if(prevState.translateX < this.calcTranslateX.minTranslateOffset){
        
                    this.calcTranslateX.translateX = this.calcTranslateX.minTranslateOffset;
        
                }else if(this.eventType === EVENT_TYPE.SWIPE || this.eventType === EVENT_TYPE.SWIPE_MOVE) {
        
                    this.calcTranslateX.calcTranslateXOnSwipe(this.eventTyper.getSwipeSpeed());
        
                }
        
                this.listStyle = { transition: 'transform 0.5s ease-out 0s' };
        
                return {
                    ...prevState,
                    translateX: this.getTranslateX(),
                }
        
            }
        
            this.calcTranslateX.onPointerUp();
        
            return prevState;

        });
    
    };

    onMouseDown = (event) => {

        console.log('onMouseDown');
        event.preventDefault();
        event.stopPropagation();

        this.onPointerDown(event.pageX, event.pageY);

        window.addEventListener('mousemove', this.onMouseMove, false);
        window.addEventListener('mouseup', this.onMouseUp, false);

    };

    onMouseMove = (event) => {
        console.log('onMouseMove');

        event.preventDefault();
        event.stopPropagation();

        //console.log("onMouseMove");

        this.onPointerMove(event.pageX, event.pageY);

    };

    onMouseUp = (event) => {
        console.log('onMouseUp');

        event.preventDefault();
        event.stopPropagation();

        this.onPointerUp(event.pageX, event.pageY);

        window.removeEventListener('mousemove', this.onMouseMove, false);
        window.removeEventListener('mouseup', this.onMouseUp, false);

    };

    onClick = (event) => {

        console.log("event.target", event.target.parentNode.getBoundingClientRect());
        console.log("itemRef", this.itemRef.current.getBoundingClientRect());

        /* this.dispatch({
            type: actions.POINTER_DOWN,
            translateX: 5,
        });
 */

        this.setState((prevState) => {

            console.log("PREV STATE ", prevState);

            return {
                ...prevState,
                translateX: prevState.translateX + 1
            };

        });
    };

    onWindowResize = () => {

        this.calcTranslateX.setValues(this.listRef, this.itemRef, this.numberOfItems);
        this.calcTranslateX.offsetX = this.containerRef.current.getBoundingClientRect().x;//right
    
        const isNeedScroller = this.calcTranslateX.isNeedScroller();
        //setValues(listWidth, itemWidth, numberOfItems, minTranslateOffset, maxTranslateOffset);
    
        this.setState((prevState) => {

            if(prevState.isNeedScroller === false){
    
                if(isNeedScroller === false){
        
                    return prevState;
        
                }else{
        
                    return { ...prevState, isNeedScroller: true };
        
                }
        
            }else{
        
                if(isNeedScroller === false){
                    return {
                        ...prevState,
                        isNeedScroller: false,
                        translateX: 0
                    };
                }else{
        
                    //check if translateX is out offsets
                    //return translateX > this.maxTranslateOffset || translateX < this.minTranslateOffset;
                    let translateX = prevState.translateX;

                    if(translateX > this.calcTranslateX.maxTranslateOffset){
        
                        translateX = this.calcTranslateX.maxTranslateOffset;
        
                    }else if(translateX < this.calcTranslateX.minTranslateOffset){
        
                        translateX = this.calcTranslateX.minTranslateOffset;
        
                    }
        
                    if(translateX !== prevState.translateX){
                        return { ...prevState, translateX: translateX };
                    }
        
                    return prevState;
        
                }
        
            }

        });
    
    
    };

    getItems = (items, getItem, onItemClick, itemClass) => {

        return this.view.getItems(items, getItem, this.itemRef, onItemClick, itemClass);

    };

    /* getItem = (itemClass) => {

        return this.view.getItem(itemClass, this.itemRef, this.onClick);

    }; */

}

export default ZScrollerController;