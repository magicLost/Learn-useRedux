
export const formType = {

    CIRCLE: "CIRCLE",

    TOP_HALF_CIRCLE: 'TOP_HALF_CIRCLE',
    BOTTOM_HALF_CIRCLE: 'BOTTOM_HALF_CIRCLE',
    RIGHT_HALF_CIRCLE: 'RIGHT_HALF_CIRCLE',
    LEFT_HALF_CIRCLE: 'LEFT_HALF_CIRCLE',

    TOP_RIGHT_QUARTER: "TOP_RIGHT_QUARTER",
    TOP_LEFT_QUARTER: "TOP_LEFT_QUARTER",
    BOTTOM_RIGHT_QUARTER: "BOTTOM_RIGHT_QUARTER",
    BOTTOM_LEFT_QUARTER: "BOTTOM_LEFT_QUARTER",

};

class FeatureConfig {

   /*  isShowTitle = true;
    isMainItemText = false; */

    itemsLength = 0;
    itemsLengthForDegreesCalc = 0;

    radius = 100;
    degreesAll = 90;
    degreesMarga = 270;
    topRightBgClasses = ' ';
    topLeftBgClasses = ' ';
    bottomRightBgClasses = ' ';
    bottomLeftBgClasses = '';
    hiddenBgClass = '';

    titleStyle = {
        top: '0',
        left: '-210px',
        transformOrigin: 'top left',
        transform: 'rotate(45deg)'
    }

    constructor(type, itemsLength, topRightClass, topLeftClass, bottomRightClass, bottomLeftClass, hiddenClass){

        this.topRightBgClasses = topRightClass;
        this.topLeftBgClasses = topLeftClass;
        this.bottomRightBgClasses = bottomRightClass;
        this.bottomLeftBgClasses = bottomLeftClass;
        this.hiddenBgClass = hiddenClass;

        this.itemsLength = itemsLength;
        this.itemsLengthForDegreesCalc = this.itemsLength - 1;

        this.init(type);

    }

    init = (type) => {

        switch(type){
    
            case formType.CIRCLE:
    
                this.degreesAll = 360;
                this.itemsLengthForDegreesCalc = this.itemsLength;
                this.titleStyle = { top: '-160px', left: '-150px'};

                break;

             /*    return {
    
                    degreesAll: 360,
                    degreesMarga: 0,
                    topRightBgClasses: topRightClass,
                    topLeftBgClasses: topLeftClass,
                    bottomRightBgClasses: bottomRightClass,
                    bottomLeftBgClasses: bottomLeftClass,
    
                    titleStyle: { top: '-160px', left: '-150px' }
    
                }; */
    
            case formType.TOP_HALF_CIRCLE:
    
                this.degreesAll = 180;
                this.degreesMarga = 90;
                this.bottomLeftBgClasses += ' ' + this.hiddenBgClass;
                this.bottomRightBgClasses += ' ' + this.hiddenBgClass;
                this.titleStyle = { top: '-160px', left: '-150px'};

                break;

               /*  return {
    
                    degreesAll: 180,
                    degreesMarga: 90,
                    topRightBgClasses: topRightClass,
                    topLeftBgClasses: topLeftClass,
                    bottomRightBgClasses: bottomRightClass + ' ' + hiddenClass,
                    bottomLeftBgClasses: bottomLeftClass + ' ' + hiddenClass,
    
                    titleStyle: { top: '-160px', left: '-150px' }
    
                }; */
    
            case formType.BOTTOM_HALF_CIRCLE:
    
                this.degreesAll = 180;
                this.degreesMarga = 270;
                this.topLeftBgClasses += ' ' + this.hiddenBgClass;
                this.topRightBgClasses += ' ' + this.hiddenBgClass;
                this.titleStyle = { top: '150px', left: '-150px'};

                break;

                /* return {
    
                    degreesAll: 180,
                    degreesMarga: 270,
                    topRightBgClasses: topRightClass + ' ' + hiddenClass,
                    topLeftBgClasses: topLeftClass + ' ' + hiddenClass,
                    bottomRightBgClasses: bottomRightClass,
                    bottomLeftBgClasses: bottomLeftClass,
    
                    titleStyle: { top: '150px', left: '-150px'}
    
                }; */
    
            case formType.RIGHT_HALF_CIRCLE:
    
                this.degreesAll = 180;
                this.degreesMarga = 0;
                this.bottomLeftBgClasses += ' ' + this.hiddenBgClass;
                this.topLeftBgClasses += ' ' + this.hiddenBgClass;

                this.titleStyle = {
                    top: '-170px',
                    left: '120px',
                    transformOrigin: 'top left',
                    transform: 'rotate(60deg)'
                };

                break;

                /* return {
    
                    degreesAll: 180,
                    degreesMarga: 0,
                    topRightBgClasses: topRightClass,
                    topLeftBgClasses: topLeftClass + ' ' + hiddenClass,
                    bottomRightBgClasses: bottomRightClass,
                    bottomLeftBgClasses: bottomLeftClass + ' ' + hiddenClass,
    
                    titleStyle: {
                        top: '-170px',
                        left: '120px',
                        transformOrigin: 'top left',
                        transform: 'rotate(60deg)'
                    }
    
                }; */
    
            case formType.LEFT_HALF_CIRCLE:
    
                this.degreesAll = 180;
                this.degreesMarga = 180;
                this.topRightBgClasses += ' ' + this.hiddenBgClass;
                this.bottomRightBgClasses += ' ' + this.hiddenBgClass;

                this.titleStyle = {
                    top: '-170px',
                    left: '-410px',
                    transformOrigin: 'top right',
                    transform: 'rotate(-60deg)'
                };

                break;

                /* return {
    
                    degreesAll: 180,
                    degreesMarga: 180,
                    topRightBgClasses: topRightClass + ' ' + hiddenClass,
                    topLeftBgClasses: topLeftClass,
                    bottomRightBgClasses: bottomRightClass + ' ' + hiddenClass,
                    bottomLeftBgClasses: bottomLeftClass,
    
                    titleStyle: {
                        top: '-170px',
                        left: '-410px',
                        transformOrigin: 'top right',
                        transform: 'rotate(-60deg)'
                    }
    
                }; */
    
            case formType.TOP_RIGHT_QUARTER:
    
                this.degreesAll = 90;
                this.degreesMarga = 90;
                this.topLeftBgClasses += ' ' + this.hiddenBgClass;
                this.bottomRightBgClasses += ' ' + this.hiddenBgClass;
                this.bottomLeftBgClasses += ' ' + this.hiddenBgClass;

                this.titleStyle = {
                    top: '-235px',
                    left: '30px',
                    transformOrigin: 'top left',
                    transform: 'rotate(45deg)'
                };

                break;

                /* return {
    
                    degreesAll: 90,
                    degreesMarga: 90,
                    topRightBgClasses: topRightClass,
                    topLeftBgClasses: topLeftClass + ' ' + hiddenClass,
                    bottomRightBgClasses: bottomRightClass + ' ' + hiddenClass,
                    bottomLeftBgClasses: bottomLeftClass + ' ' + hiddenClass,
    
                    titleStyle: {
                        top: '-235px',
                        left: '30px',
                        transformOrigin: 'top left',
                        transform: 'rotate(45deg)'
                    }
    
                }; */
    
            case formType.TOP_LEFT_QUARTER:
    
                this.degreesAll = 90;
                this.degreesMarga = 180;
                this.topRightBgClasses += ' ' + this.hiddenBgClass;
                this.bottomRightBgClasses += ' ' + this.hiddenBgClass;
                this.bottomLeftBgClasses += ' ' + this.hiddenBgClass;

                this.titleStyle = {
                    top: '-30px',
                    left: '-235px',
                    transformOrigin: 'top left',
                    transform: 'rotate(-45deg)'
                };

                break;


                /* return {
    
                    degreesAll: 90,
                    degreesMarga: 180,
                    topRightBgClasses: topRightClass + ' ' + hiddenClass,
                    topLeftBgClasses: topLeftClass,
                    bottomRightBgClasses: bottomRightClass + ' ' + hiddenClass,
                    bottomLeftBgClasses: bottomLeftClass + ' ' + hiddenClass,
    
                    titleStyle: {
                        top: '-30px',
                        left: '-235px',
                        transformOrigin: 'top left',
                        transform: 'rotate(-45deg)'
                    }
    
                }; */
    
            case formType.BOTTOM_RIGHT_QUARTER:
    

                this.degreesAll = 90;
                this.degreesMarga = 0;
                this.topRightBgClasses += ' ' + this.hiddenBgClass;
                this.topLeftBgClasses += ' ' + this.hiddenBgClass;
                this.bottomLeftBgClasses += ' ' + this.hiddenBgClass;

                this.titleStyle = {
                    top: '210px',
                    left: '0',
                    transformOrigin: 'top left',
                    transform: 'rotate(-45deg)'
                };

                break;

                /* return {
    
                    degreesAll: 90,
                    degreesMarga: 0,
                    topRightBgClasses: topRightClass + ' ' + hiddenClass,
                    topLeftBgClasses: topLeftClass + ' ' + hiddenClass,
                    bottomRightBgClasses: bottomRightClass,
                    bottomLeftBgClasses: bottomLeftClass + ' ' + hiddenClass,
    
                    titleStyle: {
                        top: '210px',
                        left: '0',
                        transformOrigin: 'top left',
                        transform: 'rotate(-45deg)'
                    }
    
                }; */
    
            case formType.BOTTOM_LEFT_QUARTER:
    
                this.degreesAll = 90;
                this.degreesMarga = 270;
                this.topRightBgClasses += ' ' + this.hiddenBgClass;
                this.topLeftBgClasses += ' ' + this.hiddenBgClass;
                this.bottomRightBgClasses += ' ' + this.hiddenBgClass;

                this.titleStyle = {
                    top: '0',
                    left: '-210px',
                    transformOrigin: 'top left',
                    transform: 'rotate(45deg)'
                };

                break;

                /* return {
    
                    degreesAll: 90,
                    degreesMarga: 270,
                    topRightBgClasses: topRightClass + ' ' + hiddenClass,
                    topLeftBgClasses: topLeftClass + ' ' + hiddenClass,
                    bottomRightBgClasses: bottomRightClass + ' ' + hiddenClass,
                    bottomLeftBgClasses: bottomLeftClass,
    
                    titleStyle: {
                        top: '0',
                        left: '-210px',
                        transformOrigin: 'top left',
                        transform: 'rotate(45deg)'
                    }
    
                }; */
    
            default: console.error("Unknown form type == " + type); break;
        }
    
    };
    

}

export default FeatureConfig;