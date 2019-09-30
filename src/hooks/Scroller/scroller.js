import {useReducer, useState} from "react";
import { init, onPointerDown, onPointerMove, onPointerUp, onWindowResize, onItemClick } from "./scrollerAC";


export const actions = {
    INIT: "INIT",
    POINTER_DOWN: "POINTER_DOWN",
    POINTER_MOVE: "POINTER_MOVE",
    POINTER_UP: "POINTER_UP",
    WINDOW_RESIZE: "WINDOW_RESIZE",
    ITEM_CLICK: "ITEM_CLICK"
}

export const useScroller = (calcTranslateX, eventSorter) => {

    const initState = {

        calc: calcTranslateX,
        event: eventSorter,

        translateX: 0,
        isNeedScroller: false,
        listStyle: {},

        eventType: ''

    };


    const reducer = (state, action) => {

       /*  console.log(state);*/
        //console.log(action.type, action); 

        switch(action.type){

            //case "INIT_STATE": return {...state, created: action.created, activeSectionIndex: action.activeSectionIndex, prevIndex: action.prevIndex};
            case actions.INIT: return init(state, action);
            case actions.POINTER_DOWN: return onPointerDown(state, action);
            case actions.POINTER_MOVE: return onPointerMove(state, action);
            case actions.POINTER_UP: return onPointerUp(state, action);
            case actions.WINDOW_RESIZE: return onWindowResize(state, action);
            case actions.ITEM_CLICK: return onItemClick(state, action);


            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, initState);

    return [ state.translateX, state.isNeedScroller, state.listStyle, state.eventType, dispatch ];

};