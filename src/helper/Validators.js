
export const validatorTypes = {

    REQUIRED: "REQUIRED",
    REGEX: "REGEX",
    LENGTH: "LENGTH",
    FILE_TYPE: "FILE_TYPE",
    FILE_SIZE: "FILE_SIZE"

};

export const isString = (value) => {

    return typeof value === 'string';

};

export const isFileList = (value) => {

    return typeof value === 'object' && value instanceof FileList;

};

export const isArray = (value) => {

    return Array.isArray(value);

};

export const inArray = (value, options) => {

    if(!isArray(value)) return 'Need array';

    for(let val of options.array){

        if(val === value) return '';

    }

    return options.errorMessage;

};

export const isEmpty = (value, options) => {

    if(!isString(value)){
        console.error("We need string.");
        return '';
    }

    if(value.length === 0)
        if(options && options.errorMessage){
            return options.errorMessage;
        }else{
            return "Как-то пусто...";
        }
    else
        return "";

};

export const length = (value, options) => {

    if(!isString(value)){
        console.error("We need string.");
        return '';
    }

    if(value === '') return '';

    if(!options){

        console.error("Where is options, MFK...");
        return '';

    }

    const length = value.length;

    if(options.min && length < options.min){

        if(options.errorMessages && options.errorMessages.min){
            return options.errorMessages.min;
        }else{
            return "Коротковато будет.";
        }

    }

    if(options.max && length > options.max){

        if(options.errorMessages && options.errorMessages.max){
            return options.errorMessages.max;
        }else{
            return "Длинновато будет.";
        }

    }

    return "";

};

//options - { errorMessage: '', fileTypes: [] }
export const fileType = (fileList, options) => {

    if(!isFileList(fileList)){

        console.error("We need FileList.");
        return '';

    }

    if(fileList.length === 0) return '';

    for(let i = 0; i < options.fileTypes.length; i++) {
        if(fileList[0].type === options.fileTypes[i]) {
            return '';
        }
    }

    return options.errorMessage;

};

//options - { errorMessage: '', maxSize: 5 * 1048576 }
export const fileSize = (fileList, options) => {

    if(!isFileList(fileList)){

        console.error("We need FileList.");
        return '';

    }

    if(fileList.length === 0) return '';

    if(fileList[0].size > options.maxSize){

        return options.errorMessage;

    }

    return '';

};

export const fileNameRegex = (fileList, options) => {

    if(!isFileList(fileList)){

        console.error("We need FileList.");
        return '';

    }

    if(fileList.length === 0) return '';

    return this.regex(fileList[0].name, options);

};

export const regex = (value, options) => {

    if(!isString(value)){
        console.error("bad value for regex + " + value);
        return '';
    }

    if(!options || !options.pattern){

        console.error("Where is options with pattern, MFK...");
        return '';

    }

    if(value.length === 0)
        return "";

    const match = value.match(options.pattern);

    //console.log(match);

    if(match === null){

        if(options.errorMessage){
            return options.errorMessage;
        }else{
            return 'Использованы недопустимые символы...';
        }

    }else if(match[0] !== value){

        if(options.errorMessage){
            return options.errorMessage;
        }else{
            return 'Использованы недопустимые символы...';
        }

    }

    return '';

};

