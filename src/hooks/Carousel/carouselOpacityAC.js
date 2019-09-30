
export const onPointerDownOp = (state, action) => {

    state.calc.onPointerDown(action.pageX, action.pageY);

    return {...state, isTranslated: true};


};

export const onPointerMoveOp = (state, action) => {

    //action.pageX, action.pageY
    const pageX = action.pageX;
    const pageY = action.pageY;

    state.calc.onPointerMove(pageX, pageY);

    if(state.calc.isYScroll){
        return state;
    }else{
        return {...state, isTranslated: true, opacity: state.calc.calcOpacity(pageX, pageY)};
    }

};

export const onPointerUpOp = (state, action) => {

    if(!state.calc.isYScroll && state.calc.isEnougthDist()){

        if(state.calc.isIndexIncrease()){

            action.increaseActiveIndex();

        }else{

            action.decreaseActiveIndex();

        }

    }

    state.calc.isYScroll = false;
    state.calc.isFirstMove = true;

    return {...state, isTranslated: false, opacity: 1};

};