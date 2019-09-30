import {useReducer, useState} from 'react';

export const useHello = () => {

    const reducer = (state, action) => {

        switch(action.type){

            case "SAY_HELLO": return {hello: action.hello};

            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, {hello: "hello"});

    return [ state.hello, dispatch ];

   /*  const [hello, setHello] = useState("hello");

    return [ hello, setHello ]; */

};

export const useBuy = () => {

    const reducer = (state, action) => {

        switch(action.type){

            case "SAY_BUY": return {buy: action.buy};

            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, {buy: "buy"});

    return [ state.buy, dispatch ];

    /* const [buy, setBuy] = useState("buy");

    return [ buy, setBuy ]; */

};

//We need hook with no state to union other hooks
export const useTest = () => {

    const [hello, dispatchHello] = useHello();
    const [buy, dispatchBuy] = useBuy();

    
    const setValues = (hello, buy) => {

        dispatchHello({type: "SAY_HELLO", hello: hello});
        dispatchBuy({type: "SAY_BUY", buy: buy});

    }

    return [ hello, buy, setValues ];

   /*  const [hello, setHello] = useHello();
    const [buy, setBuy] = useBuy();

    const [title, setTitle] = useState("Title");

    const setValues = (hello, buy, title) => {

        setHello(hello);
        setBuy(buy);
        setTitle(title);

    };

    return [ hello, buy, title, setValues ]; */

};