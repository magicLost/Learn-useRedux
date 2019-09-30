
export const onPointerDownTr = (state, action) => {

    state.calc.onPointerDown(action.pageX, action.pageY);

    return {...state, listStyle: {}, isTranslated: true};


};

export const onPointerMoveTr = (state, action) => {

    console.log("Move ", state.translateX, state.calc);
    //action.pageX, action.pageY
    const pageX = action.pageX;
    const pageY = action.pageY;

    state.calc.onPointerMove(pageX, pageY, action.activeIndex, action.itemsLength);

    if(state.translateX !== state.calc.translateX){
        return {...state, translateX: state.calc.translateX};
    }else{
        return state;
    }

};

export const onPointerUpTr = (state, action) => {

    let listStyle = {};

    if(!state.calc.isYScroll && state.calc.isEnougthDist()){

        listStyle = {
            transitionProperty: 'transform',
            transitionDuration: '0.5s'
        };

        if(state.calc.isIndexIncrease()){

            action.increaseActiveIndex();

        }else{

            action.decreaseActiveIndex();

        }

    }

    state.calc.onPointerUp();

    return {...state, listStyle: listStyle, isTranslated: false, translateX: 0};

};