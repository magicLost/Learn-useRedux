
export const getFormData = (stateFormElements, elements, hiddenFields) => {

    const formData = new FormData();

    for(let elementName in elements){

        if(stateFormElements.hasOwnProperty(elementName)){

            let value = stateFormElements[elementName].fileList !== undefined ?
            stateFormElements[elementName].fileList[0] : stateFormElements[elementName].value;

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

export const hasInputsError = (formState) => {

    if(formState.formError !== '')
        return true;

    for(let element in formState.formElements){

        if(formState.formElements[element].error !== '') return true;

    }

    return false;
};