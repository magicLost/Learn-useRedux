
class PageHelper {

    classes = null;

    numberOfSections = 0;
    prevIndex = 0;
    activeIndex = 0;
    
    created = [];

    mainSectionClasses = '';
    leftSectionClasses = '';
    contactsSectionClasses = '';

    html = null;

    constructor(classes, numberOfSections, activeIndex, prevIndex){

        this.classes = classes;
        this.numberOfSections = numberOfSections;
        this.activeIndex = activeIndex;
        this.prevIndex = prevIndex;
        this.mainSectionClasses = classes.Section;

        const arrayOfCreated = [];

        for(let i = 0; i < numberOfSections; i++){
            arrayOfCreated[i] = i === activeIndex;
        }

        this.created = arrayOfCreated;
        this.html = document.querySelector("html");

    }

    onDecreaseActiveIndex = () => {

        //TODO check index

        if(this.activeIndex > 0){

            this.html.scrollTop = 0;

            this.prevIndex = this.activeIndex;

            this.activeIndex = this.activeIndex - 1;


            if(this.created[this.activeIndex] === false){

                this.created[this.activeIndex] = true;

            }


            this.setClassesByActiveIndex();

        }

    };

    onIncreaseActiveIndex = () => {

        //TODO check index

        if(this.activeIndex < this.numberOfSections - 1){

            this.html.scrollTop = 0;

            this.prevIndex = this.activeIndex;

            this.activeIndex = this.activeIndex + 1;


            if(this.created[this.activeIndex] === false){

                this.created[this.activeIndex] = true;

            }


            this.setClassesByActiveIndex();

        }

    };

    onSetActiveIndex = (target) => {

        let index = -1;

        if(target && target.datase && target.dataset.index){
            index = parseInt(target.dataset.index);
        }else{

            console.error("No data-index on item...");
            return;

        }


        if(index >= 0 && index <= this.numberOfSections - 1){

            if(this.created[index] === false){

                this.created[index] = true;

            }

            this.html.scrollTop = 0;

            this.prevIndex = this.activeIndex;

            this.activeIndex = index;

            this.setClassesByActiveIndex();

        }

    };

    setClassesByActiveIndex = () => {

        switch(this.activeIndex){

            case 1:

                if(this.prevIndex === 0){

                    this.mainSectionClasses = [ this.classes.Section, this.classes.AnimationMoveFromRightToCenter ].join(' ');
                    this.leftSectionClasses = this.classes.Section;
                    this.contactsSectionClasses = this.classes.Section;

                }else{

                    this.mainSectionClasses = [ this.classes.Section, this.classes.AnimationMoveFromLeftToCenter ].join(' ');
                    this.leftSectionClasses = this.classes.Section;
                    this.contactsSectionClasses = this.classes.Section;

                }

                break;

            case 0:

                this.mainSectionClasses = this.classes.Section;
                this.leftSectionClasses = [ this.classes.Section, this.classes.AnimationMoveFromLeftToCenter ].join(' ');
                this.contactsSectionClasses = this.classes.Section;
                break;

            case 2:
                this.mainSectionClasses = this.classes.Section;
                this.leftSectionClasses = this.classes.Section;
                this.contactsSectionClasses = [ this.classes.Section, this.classes.AnimationMoveFromRightToCenter ].join(' ');
                break;

            default: console.error("no implementation for index == " + this.activeIndex);

        }

    };

}

export default PageHelper;