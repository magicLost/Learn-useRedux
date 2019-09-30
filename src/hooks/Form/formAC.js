import {validate} from "../../helper/Validate";
import * as validator from "../../helper/Validators";


export const onInputChange = (state, action) => {

    const target = action.target;

    const name = target.name;
    const value = target.value;
    const fileList = target.type === 'file' ? target.files : null;

    let error = '';

    if(action.validationRules){

        if(fileList){
            error = validate(fileList, validator, action.validationRules);
        }else{
            error = validate(value, validator, action.validationRules);
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

    return {

        formError: '',
        formElements: 
        {
            ...state.formElements, 
            [data.name]: data.state
        }
    }

};

export const onClearState = (state, action) => {

    return getInitState(action.elements);
    
};

export const getInitState = (elements) => {

    const formElements = getFormElements(elements);

    return {
        formElements: formElements,
        formError: ''
    };

};

export const getFormElements = (elements) => {

    const formElements = {};

    for(let element in elements){

        if(elements[element].elementType === 'file'){
            formElements[element] = {value: '', fileList: null, error: ''} ;
        }else{
            formElements[element] = {value: '', error: ''} ;
        }

    }

    return formElements;

};