import {createToken} from "./createToken";

describe('createToken', () => {

    test('', () => {

        console.error = jest.fn();
        expect(createToken([])).toEqual('');

        expect(createToken('')).toEqual('');
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("For create token need array");

        expect(createToken(['mike', 'fred', 'hello'])).toHaveLength(20);

    });

});