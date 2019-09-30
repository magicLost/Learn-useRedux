import {
    isString,
    isFileList,
    regex,
    length,
    isEmpty,
    inArray,
    fileType,
    fileSize
} from "./Validators";

describe('Validators', () => {

    test('isString', () => {

        expect(isString('hello')).toEqual(true);
        expect(isString('123')).toEqual(true);
        expect(isString(123 + 'abc')).toEqual(true);
        expect(isString('abc' + 123)).toEqual(true);
        expect(isString(123)).toEqual(false);
        expect(isString({})).toEqual(false);

    });

    test('isFileList', () => {

        //expect(isFileList).toEqual(1);

    });

    test('Regex', () => {

        console.error = jest.fn();
        expect(regex(123, { pattern: '', errorMessage: '' })).toEqual('');
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("bad value for regex + " + 123);
        console.error.mockClear();

        expect(regex([], { pattern: '', errorMessage: '' })).toEqual('');
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("bad value for regex + ");
        console.error.mockClear();

        expect(regex('hello')).toEqual('');
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("Where is options with pattern, MFK...");
        console.error.mockClear();

        expect(regex('')).toEqual('');

        //pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
        //         errorMessage: "Недопустимый символ."

        expect(regex('hello', { pattern: /[a-zA-ZА-Яа-я 0-9-]*/, errorMessage: 'Недопустимый символ.' })).toEqual('');
        expect(regex('!hello', { pattern: /[a-zA-ZА-Яа-я 0-9-]*/, errorMessage: 'Недопустимый символ.' })).toEqual('Недопустимый символ.');

    });

    test('isEmpty', () => {

        //expect(isEmpty).toEqual(1);

    });

    test('length', () => {

        //expect(length).toEqual(1);

    });

    test('inArray', () => {

        //expect(inArray).toEqual(1);

    });

    test('fileType', () => {

        //expect(fileType).toEqual(1);

    });

    test('fileSize', () => {

        //expect(fileSize).toEqual(1);

    });

});