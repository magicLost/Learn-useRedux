import {useReducer} from 'react';
import { onPointerDownOp, onPointerMoveOp, onPointerUpOp } from './carouselOpacityAC';
import { onPointerDownTr, onPointerMoveTr, onPointerUpTr } from './carouselTranslateAC';

//import CalcTranslateX from '../container/Carousel/CarouselTranslate/Helper/calcTranslateX';


export const useCarouselOpacity = (calcOpacity) => {

    const initState = {

        calc: calcOpacity,

        isTranslated: false,

        opacity: 1

    }

    

    const reducer = (state, action) => {

        //console.log(state, action);

        switch(action.type){

            case "POINTER_DOWN": return onPointerDownOp(state, action);

            case "POINTER_MOVE": return onPointerMoveOp(state, action);

            case "POINTER_UP": return onPointerUpOp(state, action);

            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, initState);

    return [
        state.opacity,
        state.isTranslated,
        dispatch
    ];

};

export const useCarouselTranslate = (calcTranslateX) => {

    const initState = {

        calc: calcTranslateX,

        listStyle: {},

        isTranslated: false,

        translateX: 0

    }

    const reducer = (state, action) => {

        //console.log(state, action);

        switch(action.type){

            case "POINTER_DOWN": return onPointerDownTr(state, action);

            case "POINTER_MOVE": return onPointerMoveTr(state, action);

            case "POINTER_UP": return onPointerUpTr(state, action);

            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, initState);

    return [
        state.translateX,
        state.isTranslated,
        state.listStyle,
        state.calc.getTranslateX,
        dispatch
    ];

};