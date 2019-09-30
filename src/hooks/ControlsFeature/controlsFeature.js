import {useReducer} from 'react';
import { onMainItemMouseDown, onItemMouseUp, onWindowMouseUp, onItemMouseEnter, onItemMouseLeave, onMainItemTouchStart, onMainItemTouchMove, onMainItemTouchEnd } from './controlsFeatureAC';


export const actions = {

    MAIN_ITEM_MOUSE_DOWN: "MAIN_ITEM_MOUSE_DOWN",
    ITEM_MOUSE_UP: "ITEM_MOUSE_UP",
    WINDOW_MOUSE_UP: "WINDOW_MOUSE_UP",
    ITEM_MOUSE_ENTER: "ITEM_MOUSE_ENTER",
    ITEM_MOUSE_LEAVE: "ITEM_MOUSE_LEAVE",
    MAIN_ITEM_TOUCH_START: "MAIN_ITEM_TOUCH_START",
    MAIN_ITEM_TOUCH_MOVE: "MAIN_ITEM_TOUCH_MOVE",
    MAIN_ITEM_TOUCH_END: "MAIN_ITEM_TOUCH_END",
    

}

export const useControlsFeature = (helper) => {

    //console.log("useControlsFeature");

    const initState = {

        helper: helper,

        isShowItems: false,
        title: '',
        mainItemText: 'Главное'

    }


    const reducer = (state, action) => {

        console.log("STATE", state);
        console.log("ACTION", action);

        switch(action.type){

            case actions.MAIN_ITEM_MOUSE_DOWN: return onMainItemMouseDown(state, action);
            case actions.ITEM_MOUSE_UP: return onItemMouseUp(state, action);
            case actions.WINDOW_MOUSE_UP: return onWindowMouseUp(state, action);
            case actions.ITEM_MOUSE_ENTER: return onItemMouseEnter(state, action);
            case actions.ITEM_MOUSE_LEAVE: return onItemMouseLeave(state, action);
            case actions.MAIN_ITEM_TOUCH_START: return onMainItemTouchStart(state, action);
            case actions.MAIN_ITEM_TOUCH_MOVE: return onMainItemTouchMove(state, action);
            case actions.MAIN_ITEM_TOUCH_END: return onMainItemTouchEnd(state, action);

            default: return state;
        }

    };


    const [state, dispatch] = useReducer(reducer, initState);

    return [ state.helper, state.isShowItems, state.title, state.mainItemText, dispatch]

};