import React, { useState } from 'react';



const Accordion = (props) => {
    // state initialization in functional components
    // [piece of state, setter to change the state] = useState(default value of the state)
    // calling setter function inside the code will rerender the component as expected
    const [activeIndex, setActiveIndex] = useState(null);
    
    const onTitleClicked = (index) => {
        setActiveIndex(index);
    }

    const renderedItems = props.items.map((item, index) => {
        const active = index === activeIndex ? 'active' : '';

        return (
            <React.Fragment key={item.title}>
                <div onClick={() => onTitleClicked(index)} 
                    className={`title ${active}`} >
                    <i className='dropdown icon'></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        );
    })
    return (
        <div className='ui styled accordion'>
            {renderedItems}
        </div>
        );
};

export default Accordion;