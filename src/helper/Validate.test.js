import validate from "./Validate";
import {
    validatorTypes
} from "./Validators";


const validationRules = {
    [validatorTypes.REQUIRED]: { errorMessage: "Как к вам обращаться?"},
    [validatorTypes.REGEX]: {
        pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
        errorMessage: "Недопустимый символ."
    },
    [validatorTypes.LENGTH]: {min: 2, max: 100, errorMessages: { min: "Минимум 2 символа.", max: "Максимум 100 символов."}}
};

describe('Validate', () => {

    test('', () => {

        //mock validator functions
        const validator = {validatorTypes: validatorTypes};
        //length, isEmpty, fileType, fileSize, regex
        validator.regex = jest.fn();
        validator.length = jest.fn();
        validator.isEmpty = jest.fn();
        validator.fileType = jest.fn();
        validator.fileSize = jest.fn();

        //check if it calls with arg
        validate('hello', validator, validationRules);

        expect(validator.regex).toHaveBeenCalledTimes(1);
        expect(validator.isEmpty).toHaveBeenCalledTimes(1);
        expect(validator.length).toHaveBeenCalledTimes(1);
        expect(validator.fileType).toHaveBeenCalledTimes(0);

    });

});