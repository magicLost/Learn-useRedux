import {useReducer} from "react";
import { onShowForm, onHideForm, onDecreaseActiveSectionIndex, onIncreaseActiveSectionIndex, onSetActiveSectionIndex } from "./pageAC";


export const pageActions = {

    INCREASE_SECTION_INDEX: "INCREASE_SECTION_INDEX",
    DECREASE_SECTION_INDEX: "DECREASE_SECTION_INDEX",
    SET_ACTIVE_SECTION_INDEX: "SET_ACTIVE_SECTION_INDEX",
    SHOW_FORM: "SHOW_FORM",
    HIDE_FORM: "HIDE_FORM"

};

export const usePage = (helper) => {

    const initState = {

        helper: helper,

        activeSectionIndex: helper.activeIndex,

        //FORMS
        isShowForm: false,
        formType: '',
        hiddenFields: [] // [{}, {}]

    };

    const reducer = (state, action) => {

        console.log(action.type);
        console.log(state);

        switch(action.type){

            //case "INIT_STATE": return {...state, created: action.created, activeSectionIndex: action.activeSectionIndex, prevIndex: action.prevIndex};
            case pageActions.SET_ACTIVE_SECTION_INDEX: return onSetActiveSectionIndex(state, action);
            case pageActions.INCREASE_SECTION_INDEX: return onIncreaseActiveSectionIndex(state, action);
            case pageActions.DECREASE_SECTION_INDEX: return onDecreaseActiveSectionIndex(state, action);
            case pageActions.SHOW_FORM: return onShowForm(state, action);
            case pageActions.HIDE_FORM: return onHideForm(state, action);

            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, initState);

    

    return [state.helper, state.activeSectionIndex, state.isShowForm, state.formType, state.hiddenFields, dispatch];

};