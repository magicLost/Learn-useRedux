import React, {useMemo} from 'react';
import classes from './Tantamareski.module.scss';
import {usePage, pageActions} from "../../../hooks/Page/page";
import {toolbarItemsArray} from "../../../data/tantamareski_data";
import Button, {button_type} from "../../../component/UI/Button/Button";
import Modal from "../../../component/Modal/Modal";
import ZCallMe from "../../Forms/ZCallMe/ZCallMe";
import PageHelper from '../../../hooks/Page/PageHelper';

import {form_type} from "../../../data/forms";


const form_type = {
    CALL_ME: "CALL_ME",
    CALL_ME_WITH_SAMPLE: "CALL_ME_WITH_SAMPLE",
    CALC_PRICE: "CALC_PRICE"
};

const Tantamareski = ({toolbarItemsArray}) => {

    /*HOOKS*/
    const [helper, activeSectionIndex, isShowForm, formType, hiddenFields,  dispatch] = usePage(new PageHelper(
        classes, 
        toolbarItemsArray.length, 
        1, 0
    ));

    /*LISTENERS*/

    const decreaseSectionIndex = (event) => {

        event.preventDefault();
        event.stopPropagation();

        //TODO check index

        dispatch({type: pageActions.DECREASE_SECTION_INDEX});

    };

    const increaseSectionIndex = (event) => {

        event.preventDefault();
        event.stopPropagation();

        //TODO check index

        dispatch({type: pageActions.CREASE_SECTION_INDEX});

    };

    const onShowCallMeForm = (event) => {

        event.preventDefault();
        event.stopPropagation();
        
        dispatch({type: pageActions.SHOW_FORM, formType: form_type.CALL_ME});

    };

    const onHideForm = (event) => {

        event.preventDefault();
        event.stopPropagation();
        
        dispatch({type: pageActions.HIDE_FORM});

    };

    console.log("render Tantamareski", helper, activeSectionIndex, isShowForm, formType, hiddenFields);

    return (
        
        <div className={classes.Tantamareski}>

            { useMemo(() => (
                <header>
                    <div className={classes.Switcher}>
                        <Button type={button_type.OUTLINED} label={"Prev"} onClick={decreaseSectionIndex}/>
                        <h4 className={classes.Title}>{ toolbarItemsArray[activeSectionIndex] }</h4>
                        <Button type={button_type.OUTLINED} label={"Next"} onClick={increaseSectionIndex}/>
                        <div>
                            <Button type={button_type.CONTAINED} label={"Show form"} onClick={onShowCallMeForm}/>
                        </div>
                    </div>

                </header>
            ), [activeSectionIndex])}

            { useMemo(() => (
                <main>

                    <div
                        className={helper.mainSectionClasses}
                        style={(activeSectionIndex !== 1) ? { display: 'none'} : null}
                    >

                        <h3>Main section</h3>

                    </div>

                    { helper.created[0] &&
                    <div
                        className={helper.leftSectionClasses}
                        style={(activeSectionIndex !== 0) ? { display: 'none'} : null}
                    >

                        <h3>Tantamareski section</h3>

                    </div>
                    }

                    { helper.created[2] &&
                    <div
                        className={helper.contactsSectionClasses}
                        style={(activeSectionIndex !== 2) ? { display: 'none'} : null}
                    >

                        <h3>Contact section</h3>

                    </div>
                    }


                </main>
            ), [activeSectionIndex])}

            <Modal
                show={isShowForm}
                backdropClickHandler={onHideForm}
            >

                <ZCallMe
                    url={"http://public.local"}
                    successOKButtonClickHandler={onHideForm}
                    hiddenFields={hiddenFields}
                />

            </Modal>

        </div>
            
    );
};

export default Tantamareski;
        