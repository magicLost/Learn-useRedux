
export const getInitState = (numberOfSections, activeIndex, prevIndex) => {

    const arrayOfCreated = [];

    for(let i = 0; i < numberOfSections; i++){
        arrayOfCreated[i] = i === activeIndex;
    }

    return  {

        //SECTIONS
        activeSectionIndex: activeIndex,

        //FORMS
        isShowForm: false,
        formType: '',
        hiddenFields: [] // [{}, {}]

    };

};

export const onIncreaseActiveSectionIndex = (state, action) => {

    state.helper.onIncreaseActiveIndex();

    return {
        ...state,
        activeSectionIndex: state.helper.activeIndex
    };

};

export const onDecreaseActiveSectionIndex = (state, action) => {

    state.helper.onDecreaseActiveIndex();

    return {
        ...state,
        activeSectionIndex: state.helper.activeIndex
    };

};


export const onSetActiveSectionIndex = (state, action) => {

    state.helper.onSetActiveIndex(action.target);

    if(state.activeSectionIndex === state.helper.activeIndex) return state;

    return {
        ...state,
        activeSectionIndex: state.helper.activeIndex
    };

};

export const onShowForm = (state, action) => {

    return { 
        ...state, 
        isShowForm: true,
        formType: action.formType,
        hiddenFields: action.hiddenFields ? action.hiddenFields : []
    };

};

export const onHideForm = (state, action) => {

    return { 
        ...state, 
        isShowForm: false,
        hiddenFields: []
    };

};