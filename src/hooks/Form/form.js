import {useReducer} from 'react';
import axios from 'axios';
import { onClearState, onInputChange } from './formAC';
//import { getInitState } from './formAC';


export const formActions = {

    SET_FORM_ERROR: "SET_FORM_ERROR",
    SET_FORM_ELEMENTS: "SET_FORM_ELEMENTS",
    SET_FORM_ELEMENT: "SET_FORM_ELEMENT",
    CLEAR_STATE: "CLEAR_STATE",
    INPUT_CHANGE: "INPUT_CHANGE"

};

export const requestActions = {

    REQUEST_START: "REQUEST_START",
    REQUEST_SERVER_ERROR: "REQUEST_SERVER_ERROR",
    REQUEST_FORM_ERROR: "REQUEST_FORM_ERROR",
    REQUEST_SUCCESS: "REQUEST_SUCCESS",

};

export const useForm = (elements, initState) => {

   /*  const initState = {

        isInitState: false,

        formError: '',

        //formElements : [] //{ elementName: { value: '', error: '', fileList? } }

    }; */



    const reducer = (state, action) => {

        console.log(action.type);
        console.log(state);

        switch(action.type){
            
            case formActions.SET_FORM_ERROR: return {...state, formError: action.formError};
          /*   case "SET_FORM_ELEMENTS": return { ...state, formElements: action.formElements};
            case "SET_FORM_ELEMENT": return {
                ...state, formElements: {
                    ...state.formElements, [action.formElement.name]: action.formElement.state
                }
            }; */
            case formActions.CLEAR_STATE: return onClearState(state, action);
            case formActions.INPUT_CHANGE: return onInputChange(state, action);


            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, elements, initState);

    return [
        state,
        dispatch
    ];

};

export const useFormRequest = () => {

    const initState = {

        isRequestSuccess: false,
        isRequestError: false,
        isRequestLoading: false

    };

    const reducer = (state, action) => {

        console.log(action.type);
        console.log(state);

        switch(action.type){

            case "REQUEST_START": return {
                isRequestLoading: true,
                isRequestError: false,
                isRequestSuccess: false,
            };
            case "REQUEST_SERVER_ERROR": return {
                isRequestLoading: false,
                isRequestError: true,
                isRequestSuccess: false
            };
            case "REQUEST_FORM_ERROR": return {
                isRequestLoading: false,
                isRequestError: false,
                isRequestSuccess: false,
            };
            case "REQUEST_SUCCESS": return {
                isRequestLoading: false,
                isRequestError: false,
                isRequestSuccess: true
            };

            default: return state;
        }

    };

    const [state, requestDispatch] = useReducer(reducer, initState);

    return [
        state,
        requestDispatch
    ]; 


};

export const useFeedBackForm = (elements, formInitState) => {

    //console.log("formInitState", formInitState);

    const [formState, formDispatch] = useForm(elements, formInitState);
    const [requestState, requestDispatch] = useFormRequest();

    const postRequest = (url, formData) => {

        formDispatch({type: formActions.SET_FORM_ERROR, formError: ''});
        requestDispatch({type: requestActions.REQUEST_START});

        axios({
            method: "post",
            url: url,
            data: formData ,
            headers: {'Content-Type': 'multipart/form-data'},
        })
            .then( response => {

                if(response.data.result && response.data.result === 'success'){
                    requestDispatch({type: requestActions.REQUEST_SUCCESS});
                }else{
                    formDispatch({type: formActions.SET_FORM_ERROR, formError: response.data.error});
                    requestDispatch({type: requestActions.REQUEST_FORM_ERROR});
                }
            })
            .catch( error => {
                requestDispatch({type: requestActions.REQUEST_SERVER_ERROR});
            });

    };

    return [
        formState, 
        formDispatch,

        requestState,
        postRequest
    ]; 

};


/* export const useForm = () => {

    const initState = {

        isInitState: false,

        formError: '',

        //formElements : [] //{ elementName: { value: '', error: '', fileList? } }

    };

    const reducer = (state, action) => {

        console.log(action.type);
        console.log(state);

        switch(action.type){


            case "SET_INIT_STATE": return {...state, isInitState: true};
            case "SET_FORM_ERROR": return {...state, formError: action.formError};
            case "SET_FORM_ELEMENTS": return { ...state, formElements: action.formElements};
            case "SET_FORM_ELEMENT": return {
                ...state, formElements: {
                    ...state.formElements, [action.formElement.name]: action.formElement.state
                }
            };

            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, initState);

    const initFormState = (elements) => {

        const formElements = {};

        for(let element in elements){

            if(elements[element].elementType === 'file'){
                formElements[element] = {value: '', fileList: null, error: ''} ;
            }else{
                formElements[element] = {value: '', error: ''} ;
            }

        }


        dispatch({type: "SET_INIT_STATE"});
        dispatch({type: "SET_FORM_ERROR", formError: ''});
        dispatch({type: "SET_FORM_ELEMENTS", formElements: formElements});
        //return formElements;

    };

    const getFormData = (elements, hiddenFields) => {

        const formData = new FormData();

        for(let elementName in elements){

            if(state.formElements.hasOwnProperty(elementName)){

                let value = state.formElements[elementName].fileList !== undefined ?
                    state.formElements[elementName].fileList[0] : state.formElements[elementName].value;

                formData.append(elementName, value);

            }else{

                console.error('Bad element name == ' + elementName);

            }

        }

        if(hiddenFields !== undefined){

            for(let field of hiddenFields){

                formData.append(field.name, field.value);

            }

        }

        return formData;

    };

    const onInputChange = (target, validationRules) => {

        const name = target.name;
        const value = target.value;
        const fileList = target.type === 'file' ? target.files : null;

        let error = '';

        if(validationRules){

            if(fileList){
                error = validate(fileList, validator, validationRules);
            }else{
                error = validate(value, validator, validationRules);
            }

        }

        const data = {
            name: name,
            state: {
                value: value,
                error: error
            }
        };

        if(fileList)
            data.state.fileList = fileList;

        if(state.formError !== '')
            dispatch({type: 'SET_FORM_ERROR', error: ''});

        dispatch({type: "SET_FORM_ELEMENT", formElement: data})

    };

    const setFormError = (error) => {

        dispatch({type: 'SET_FORM_ERROR', formError: error});

    };

    return {
        formState: state,
        initFormState: initFormState,
        onInputChange: onInputChange,
        setFormError: setFormError,
        getFormData: getFormData
    };

};

export const useFeedBackForm = () => {

    const { formState, initFormState, onInputChange, setFormError, getFormData } = useForm();

    const initState = {

        isRequestSuccess: false,
        isRequestError: false,
        isRequestLoading: false

    };

    const onRequestStart = () => {
        setFormError('');
        return {
            isRequestLoading: true,
            isRequestError: false,
            isRequestSuccess: false,
        };
    };
    const onRequestFormError = (error) => {
        setFormError(error);
        return {
            isRequestLoading: false,
            isRequestError: false,
            isRequestSuccess: false,
        };
    };

    const reducer = (state, action) => {

        console.log(action.type);
        console.log(state);

        switch(action.type){

            case "REQUEST_START": return onRequestStart();
            case "REQUEST_SERVER_ERROR": return {
                isRequestLoading: false,
                isRequestError: true,
                isRequestSuccess: false
            };
            case "REQUEST_FORM_ERROR": return onRequestFormError(action.formError);
            case "REQUEST_SUCCESS": return {
                isRequestLoading: false,
                isRequestError: false,
                isRequestSuccess: true
            };

            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, initState);

    const postRequest = (url, formData) => {

        dispatch({type: "REQUEST_START"});

        axios({
            method: "post",
            url: url,
            data: formData ,
            headers: {'Content-Type': 'multipart/form-data'},
        })
            .then( response => {

                if(response.data.result && response.data.result === 'success'){
                    dispatch({type: "REQUEST_SUCCESS"});
                }else{
                    dispatch({type: "REQUEST_FORM_ERROR", formError: response.data.error});
                }
            })
            .catch( error => {
                dispatch({type: "REQUEST_SERVER_ERROR"});
            });

    };

    return {
        formState: formState,
        initFormState: initFormState,
        onInputChange: onInputChange,
        setFormError: setFormError,
        getFormData: getFormData,

        requestState: state,
        postRequest: postRequest
    };

};
 */
