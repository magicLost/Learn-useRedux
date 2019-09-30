import { sinDegrees, cosDegrees} from "../../../helper/MathF";


import { formType } from "./FeatureConfig";
import { type } from "../ControlsFeature";



export const getTranslateByCircle = (radius, degrees) => {

    let x, y;

    /*const center = { x: 0, y: 0};

    x = center.x + radius * MathF.sinDegrees(degrees);
    y = center.y + radius * MathF.cosDegrees(degrees);*/

    x = radius * sinDegrees(degrees);
    y = radius * cosDegrees(degrees);

    return 'translate(' + x + 'px, ' + y + 'px)';

};

export const getDegrees = (index, ttype, fformType, itemsLength, degreesAll, itemsLengthForDegreesCalc, degreesMarga) => {

    //console.log("degreesAll == " )

    //console.log("degrees == " + (index * (this.degreesAll / this.itemsLength - 1) + this.degreesMarga));

    if(ttype === type.TEXT && fformType === formType.BOTTOM_HALF_CIRCLE && itemsLength < 4){

        if(index === 0){

            return index * (degreesAll / itemsLengthForDegreesCalc ) + degreesMarga + 20;

        }

        if(index === itemsLength - 1){

            return index * (degreesAll / itemsLengthForDegreesCalc ) + degreesMarga - 20;

        }

    }

    return index * (degreesAll / itemsLengthForDegreesCalc ) + degreesMarga;

};