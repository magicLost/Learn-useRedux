import {useReducer, useState} from "react";


export const actions = {
    INIT: "INIT",
    POINTER_DOWN: "POINTER_DOWN",
    POINTER_MOVE: "POINTER_MOVE",
    POINTER_UP: "POINTER_UP",
    WINDOW_RESIZE: "WINDOW_RESIZE",
    ITEM_CLICK: "ITEM_CLICK"
}

export const useZScroller = (ctrl) => {

    const [state, setState] = useState({

        controller: ctrl,
        translateX: 0,
        isNeedScroller: false
    });

    state.controller.setState = setState;

    return [ state.controller, state.translateX, state.isNeedScroller ];

};