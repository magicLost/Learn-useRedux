import {element_type} from "../component/ZForm/ZForm";
import {validatorTypes} from "../helper/Validators";


export const callMeElements =  {

    name: {
        elementType: element_type.INPUT,
        elementAttrs: {
            type: 'text',
            name: 'name',
            id: 'name123',
            placeholder: 'Олимпиада'
        },
        labelValue: "Ваше имя",
        validationRules: {
            [validatorTypes.REQUIRED]: { errorMessage: "Как к вам обращаться?"},
            [validatorTypes.REGEX]: {
                pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
                errorMessage: "Недопустимый символ."
            },
            [validatorTypes.LENGTH]: {min: 2, max: 100, errorMessages: { min: "Минимум 2 символа.", max: "Максимум 100 символов."}}
        },
        value: ''
    },

    email: {

        elementType: element_type.INPUT,
        elementAttrs: {
            type: 'email',
            name: 'email',
            id: 'email123',
            placeholder: 'example@mail.ru'
        },
        labelValue: "Ваш электронный адрес",
        value: ''

    },

    phone: {
        elementType: element_type.INPUT,
        elementAttrs: {
            type: 'text',
            name: 'phone',
            id: 'phone123',
            placeholder: '921-586-34-23'
        },
        labelValue: "Ваш номер телефона",
        validationRules: {
            [validatorTypes.REGEX]: {
                pattern: /[+0-9][0-9()-]*/,
                errorMessage: "Недопустимый символ."
            },
            [validatorTypes.LENGTH]: {min: 7, max: 100, errorMessages: { min: "Минимум 7 символов.", max: "Максимум 100 символов."}}
        },
        value: ''
    },

    comment: {
        elementType: element_type.TEXTAREA,
        resize: true,
        elementAttrs: {
            name: 'comment',
            id: 'comment123',
            placeholder: 'Я бы хотел(а)...',
            rows: 2
        },
        labelValue: "Ваш комментарий",
        value: ''
    }
};

export const calcTantamareskiPrice = {

    type: {
        elementType: element_type.SELECT,
        elementAttrs: {
            name: 'type',
            id: 'type123'
        },
        labelValue: "Вид фигуры",
        options: [
            { value: "tantamareski", title: "Тантамарески", selected: false},
            { value: "figure", title: "Ростовая фигура", selected: true}
        ],
        value: 'figure'
    },

    material: {
        elementType: element_type.SELECT,
        elementAttrs: {
            name: 'material',
            id: 'material123'
        },
        labelValue: "Материал",
        options: [
            { value: "cartoon", title: "Картон", selected: true},
            { value: "plastic", title: "Пластик", selected: false},
            { value: "gold", title: "Золото", selected: false}
        ],
        value: 'cartoon'
    },

    //depth - select

    height: {
        elementType: element_type.INPUT,
        elementAttrs: {
            type: 'number',
            name: 'height',
            id: 'height123',
            placeholder: '1.25'
        },
        labelValue: "Высота, м:",
        validationRules: {
            [validatorTypes.REQUIRED]: { errorMessage: "Укажите высоту..."},
            [validatorTypes.REGEX]: {
                pattern: /[0-9]*/,
                errorMessage: "Недопустимый символ."
            },
        },
        value: ''
    },

    width: {
        elementType: element_type.INPUT,
        elementAttrs: {
            type: 'number',
            name: 'width',
            id: 'width123',
            placeholder: '0.5'
        },
        labelValue: "Ширина, м:",
        validationRules: {
            [validatorTypes.REQUIRED]: { errorMessage: "Укажите ширину..."},
            [validatorTypes.REGEX]: {
                pattern: /[0-9]*/,
                errorMessage: "Недопустимый символ."
            },
        },
        value: ''
    },

};