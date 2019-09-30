//import FeatureConfig from "../../container/ControlsFeature/Helper/FeatureConfig";
//import { type } from "../../container/ControlsFeature/ControlsFeature";
import { onItemMouseUp } from "./controlsFeatureAC";

let state = {};
let action = {};

describe("ControlsFeatureAC", () => {

    beforeEach(() => {
        
        let featureConfig = {};

        state = {

            config: featureConfig,
    
            isShowItems: false,
            title: '',
            mainItemText: 'Главное'
    
        }
    
    });
    
    describe("onItemMouseUp", () => {

        beforeEach(() => {
        
            action = { 
                items: [],
                target: { dataset: {index: 3} },
                itemClickHandler: jest.fn(),
                isMainItemText: false,
                type: "SVG"
            };
        
        });

        test("if state.isShowItems equals false return same state", () => {
            
            expect(onItemMouseUp(state, {})).toEqual(state);
            
        });

        test("if state.isShowItems equals true must call action.itemClickHandler", () => {
            
            state.isShowItems = true;

            const resState = onItemMouseUp(state, action);

            expect(action.itemClickHandler).toHaveBeenCalledTimes(1);
            expect(action.itemClickHandler).toHaveBeenCalledWith(3);

            expect(resState.isShowItems).toEqual(false);
            expect(resState.mainItemText).toEqual("");
            expect(resState.title).toEqual('');
            
        });
    
    });

});