
export const validate = (value, validator, validationRules) => {

    let error = '';

    const {validatorTypes, regex, length, isEmpty, fileType, fileSize} = validator;

    //console.log(value);

    for(let name in validationRules){

        switch(name){

            case validatorTypes.REGEX: error = regex(value, validationRules[name]);break;
            case validatorTypes.LENGTH: error = length(value, validationRules[name]);break;
            case validatorTypes.REQUIRED: error = isEmpty(value, validationRules[name]);break;

            case validatorTypes.FILE_TYPE: error = fileType(value, validationRules[name]);break;
            case validatorTypes.FILE_SIZE: error = fileSize(value, validationRules[name]);break;

            default: console.error("Bad validator name  - " + name);break;
        }

        //console.log(name, error);
        if(error) return error;

    }

    return error;

};

export default validate;


/*
import {
    validatorTypes,
    regex,
    length,
    isEmpty,
    fileType,
    fileSize
} from "./Validators";

export const validate = (value, validationRules) => {

    let error = '';

    for(let name in validationRules){

        switch(name){

            case validatorTypes.REGEX: error = regex(value, validationRules[name]);break;
            case validatorTypes.LENGTH: error = length(value, validationRules[name]);break;
            case validatorTypes.REQUIRED: error = isEmpty(value, validationRules[name]);break;

            case validatorTypes.FILE_TYPE: error = fileType(value, validationRules[name]);break;
            case validatorTypes.FILE_SIZE: error = fileSize(value, validationRules[name]);break;

            default: console.error("Bad validator name  - " + name);
        }

    }

    return error;

};

export default validate;*/
