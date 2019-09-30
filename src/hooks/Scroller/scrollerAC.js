import { EVENT_TYPE } from "../../container/Scroller/Helper/eventSorter";

export const init = (state, action) => {

    state.calc.setValues(action.listRef, action.itemRef, action.numberOfItems);
    state.calc.offsetX = action.containerRef.current.getBoundingClientRect().x;//right

    const isNeedScroller = state.calc.isNeedScroller();
    //setValues(listWidth, itemWidth, numberOfItems, minTranslateOffset, maxTranslateOffset);

    if(state.isNeedScroller !== isNeedScroller){
        return { ...state, isNeedScroller: isNeedScroller };
    }

    return state;

};

export const onPointerDown = (state, action) => {

    const pageX = action.pageX;
    const pageY = action.pageY;

    /* state.calc.pageXStart = pageX;
    state.calc.pageYStart = pageY;
    state.calc.prevPageX = pageX; */
    state.calc.onPointerDown(pageX, pageY, action.listRef);

    //const translateX = action.listRef.current.getBoundingClientRect().x -  Math.abs(state.offsetX);


    state.event.onTouchStart(pageX, pageY);

    return {
        ...state,
        listStyle: {},
        translateX: state.calc.translateX,
        //isTranslated: true
    };

};

export const onPointerMove = (state, action) => {

    const pageX = action.pageX;
    const pageY = action.pageY;

    state.calc.onPointerMove(pageX, pageY);

    if(!state.calc.isYScroll){

        state.event.onTouchMove(pageX);

        state.calc.calcTranslateXOnMove(state.translateX, pageX);

        return {
            ...state,
            translateX: state.calc.translateX,
            //isTranslated: true
        };

    }

    return state;

};

export const onPointerUp = (state, action) => {
    
    if(!state.calc.isYScroll){

        state.calc.onPointerUp();

        //what event - move, swipe etc...
        state.event.onTouchEnd(action.pageX);

        let eventType = state.event.whatEventType(action.pageY);

        if(eventType === EVENT_TYPE.CLICK){

            return {
                ...state,
                eventType: eventType
            };

        }

        if(state.translateX > state.calc.maxTranslateOffset){

            state.calc.translateX = state.calc.maxTranslateOffset;

        }else if(state.translateX < state.calc.minTranslateOffset){

            state.calc.translateX = state.calc.minTranslateOffset;

        }else if(eventType === EVENT_TYPE.SWIPE || eventType === EVENT_TYPE.SWIPE_MOVE) {

            state.calc.calcTranslateXOnSwipe(state.event.getSwipeSpeed());

        }


        return {
            ...state,
            listStyle: {
                transition: 'transform 0.5s ease-out 0s',
            },
            translateX: state.calc.translateX,
            eventType: eventType
        }

    }

    state.calc.onPointerUp();

    return state;

};

export const onWindowResize = (state, action) => {

    state.calc.setValues(action.listRef, action.itemRef, action.numberOfItems);
    state.calc.offsetX = action.containerRef.current.getBoundingClientRect().x;//right

    const isNeedScroller = state.calc.isNeedScroller();
    //setValues(listWidth, itemWidth, numberOfItems, minTranslateOffset, maxTranslateOffset);

    if(state.isNeedScroller === false){

        if(isNeedScroller === false){

            return state;

        }else{

            return { ...state, isNeedScroller: true };

        }

    }else{

        if(isNeedScroller === false){
            return {
                ...state,
                isNeedScroller: false,
                translateX: 0
            };
        }else{

            //check if translateX is out offsets
            //return translateX > this.maxTranslateOffset || translateX < this.minTranslateOffset;
            let translateX = state.translateX;
            if(translateX > state.calc.maxTranslateOffset){

                translateX = state.calc.maxTranslateOffset;

            }else if(translateX < state.calc.minTranslateOffset){

                translateX = state.calc.minTranslateOffset;

            }

            if(translateX !== state.translateX){
                return { ...state, translateX: translateX };
            }

            return state;


        }

    }


};

export const onItemClick = (state, action) => {

    //console.log("itemClickHandler start", state.eventType, state.isNeedScroller);

    if(state.isNeedScroller){

        if(state.eventType === EVENT_TYPE.CLICK){

            //console.log("itemClickHandler eval", state.eventType);
            action.itemClickHandler(action.target);

        }

    }else{

        action.itemClickHandler(action.target);

    }

    return state;

};
