
export const createToken = (arrayOfValues) => {

    let stringToHash = '';

    if(!Array.isArray(arrayOfValues)){

        console.error("For create token need array");
        return '';

    }

    for(let value of arrayOfValues){

        stringToHash += value;

    }

    stringToHash = encodeURI(stringToHash).substr(0, 63);

    let token = btoa(stringToHash);

    if(token.length >  64){

        token = token.substr(0, 63);

    }

    return token;

};
