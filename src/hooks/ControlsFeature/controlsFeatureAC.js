import { type } from "../../container/ControlsFeature/ControlsFeature";

/*MAIN ITEM EVENT LISTENERS */
export const onMainItemMouseDown = (state, action) => {

    if(!state.isShowItems){

        return { ...state, isShowItems: true };

    }

    return state;

};

/*ITEM EVENT LISTENERS */
export const onItemMouseUp = (state, action) => {

    return onItemPointerUp(state, action);

};


export const onItemMouseEnter = (state, action) => {

    if(action.target.dataset && action.target.dataset.featureName){

        const name = action.target.dataset.featureName;

        if(state.title !== name)
            return {...state, title: name};
        
    }else{

        console.error("No control feature item name");

    }

    return state;

};

export const onItemMouseLeave = (state, action) => {

    if(state.title !== ''){

        return {...state, title: ''};
        
    }

    return state;

};

/*WINDOWS */
export const onWindowMouseUp = (state, action) => {

    if(state.isShowItems){

        return { ...state, isShowItems: false, title: '' };

    }

    return state;

};


/*TOUCH EVENTS */
export const onMainItemTouchStart = (state, action) => {

    if(!state.isShowItems){

        return { ...state, isShowItems: true };

    }

    return state;

};

export const onMainItemTouchMove = (state, action) => {

    if(state.isShowItems){

        if(action.target && action.target.dataset && action.target.dataset.featureName){

            //console.log("call this.props.setActiveCarouselIndex with index == " + target.dataset.index);

            const name = action.target.dataset.featureName;

            if(state.title !== name){
                return {...state, title: name};
            }

        }else{

            if(state.title !== ''){
                return {...state, title: ''};
            }

        }

    }

    return state;

};

export const onMainItemTouchEnd = (state, action) => {

    return onItemPointerUp(state, action);

};


/*HELPER FUNCTION */
export const onItemPointerUp = (state, action) => {

    if(state.isShowItems){

        let index = -1;
        let mainItemText = '';

        if(action.target && action.target.dataset && action.target.dataset.featureIndex){

            index = parseInt(action.target.dataset.featureIndex);
            console.log(action.target, action.target.dataset.featureIndex);
            //console.log("call this.props.setActiveCarouselIndex with index == " + index);
            if(action.itemClickHandler)
                action.itemClickHandler(index);
            
        }

        if(action.isMainItemText && action.itemType === type.TEXT){

            mainItemText = (index >= 0) ? action.items[index] : state.mainItemText;

        }

        return {
            ...state,
            isShowItems: false,
            mainItemText: mainItemText,
            title: ''
        }

    }

    return state;

};