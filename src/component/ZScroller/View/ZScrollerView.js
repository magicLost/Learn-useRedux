import React from 'react';

class ZScrollerView {

    

    getItems = (items, getItem, itemRef, onItemClick, itemClass) => {

        console.log("get scroller items");

        return items.map((value, index) => {

            if(index === 0){

                return (
                    <li
                        key={itemClass + index}
                        className={itemClass}
                        ref={itemRef}
                        data-index={index}
                    >
                        { getItem(onItemClick, index) }
                    </li>
                );
    

            }else{

                return (
                    <li
                        key={itemClass + index}
                        className={itemClass}
                        data-index={index}
                    >
                        { getItem(onItemClick, index) }
                    </li>
                );
    

            }
            
        });

    };
 
  /*   getItem = (itemClass, itemRef, onClick) => {

        console.log("get scroller item");

        return (
            <div
                ref={itemRef}
                className={itemClass}
            >
                <button onClick={onClick}>Width</button>
            </div>
        );
    }; */

}

export default ZScrollerView;