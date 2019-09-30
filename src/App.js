import React, {useState, useMemo} from 'react';
import './App.css';
import Tantamareski from "./container/Pages/Tantamareski/Tantamareski";
import CarouselOpacity from './container/Carousel/CarouselOpacity/CarouselOpacity';
import CarouselTranslate from './container/Carousel/CarouselTranslate/CarouselTranslate';
import Scroller from './container/Scroller/Scroller';
import Example from './component/Example/Example';
import ControlsFeature, {type} from './container/ControlsFeature/ControlsFeature';
//import { formType } from './container/ControlsFeature/Helper/FeatureConfig';
import { mainPresentationItemsControls, toolbarItemsArray } from './data/homepage_data';
import Button, { button_type } from './component/UI/Button/Button';
import Modal from './component/Modal/Modal';
import ZCallMe from './container/Forms/ZCallMe/ZCallMe';
import { formType } from './container/ControlsFeature/Helper/ControlsFeatureHelper';
import ZScroller from './component/ZScroller/ZScroller';
import Card from './component/Card/Card';



const  App = () => {

    const [ index, setIndex ] = useState(0);
    const [ isShowForm, setIsShowForm ] = useState(false);

    //const items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
    const items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

    const toggleForm = () => {
        setIsShowForm(!isShowForm);
    };


    const increaseActiveIndex = () => {
        setIndex(index + 1);
    };

    const decreaseActiveIndex = () => {
        setIndex(index - 1);
    };

    const getItem = (index, activeIndex) => {

        return (
            <div style={{minHeight: "400px", borderBottom: "1px solid balck", backgroundColor: "lightgray"}}>
                <h3>{index}</h3>
                <p>Hello, my friend.</p>
            </div>
        );

    };

    /* const getItems = (itemClass) => {

        console.log("CarouselTranslate getItems");

        return items.map((value, index) => {

            //return getItem(index, 0, itemClass);
            console.log("item");

            return (
                <li className={itemClass} style={{minHeight: "400px", borderBottom: "1px solid balck", backgroundColor: "lightgray"}}>
                    <h3>{index}</h3>
                    <p>Hello, my friend.</p>
                </li>
            );

        });

    } */

    return (

        <div className="App">

            <Scroller
                items={items}
                numberOfItems={items.length}
                itemClickHandler={(target) => { console.log("CLICK", target); }}
            />

            <br /><hr /><br />

            <ZScroller
                items={items}
                itemClickHandler={(target) => { console.log("ZScroller itemClickHandler", target); }}
                getItem={(onItemClick, index) => (
                    <Card onClick={onItemClick} index={index}/>
                )}
            />

           {/*  <Tantamareski toolbarItemsArray={toolbarItemsArray} /> */}

       {/*      <Scroller
                items={items}
                numberOfItems={items.length}
                itemClickHandler={(target) => { console.log("CLICK", target); }}
            />

            <br />
            
            <Button label={"Toggle form"} onClick={toggleForm} type={button_type.CONTAINED} />

            <br /><br /><br />

            <ControlsFeature
                items={mainPresentationItemsControls}
                itemClickHandler={() => {console.log("ControlsFeature item click");}}
                configuration={{
                    type: type.SVG,
                    formType: formType.CIRCLE,
                    isShowTitle: true,
                    isMainItemText: false,
                    mainDivStyle: { top: 0 },
                    mainItemStyle: { backgroundColor: "white" }
                }}
            />

            <br /><br /><br />

            <ControlsFeature
                items={["Портфолио", "Главное", "Контакты"]}
                itemClickHandler={() => {console.log("ControlsFeature item click");}}
                configuration={{
                    type: type.TEXT,
                    formType: formType.BOTTOM_HALF_CIRCLE,
                    isShowTitle: false,
                    isMainItemText: true,
                    mainDivStyle: { top: 0 },
                    mainItemStyle: { backgroundColor: "white" }
                }}
            />

            <Modal
                show={isShowForm}
                backdropClickHandler={toggleForm}
            >

                <ZCallMe
                    url={"http://public.local"}
                    successOKButtonClickHandler={toggleForm}
                    hiddenFields={[]}
                />
            </Modal>
 */}
          {/*   <CarouselOpacity 
                items={items}
                getItem={getItem}
                activeIndex={index} 
                increaseActiveIndex={increaseActiveIndex} 
                decreaseActiveIndex={decreaseActiveIndex}
            />

            <br />
            <hr />
            <br />

            <CarouselTranslate
                items={items}
                getItem={getItem}
                itemsLength={items.length}
                activeIndex={index} 
                increaseActiveIndex={increaseActiveIndex} 
                decreaseActiveIndex={decreaseActiveIndex}
            /> */}

            {/* <Tantamareski/> */}

        </div>
    );

};

export default App;
