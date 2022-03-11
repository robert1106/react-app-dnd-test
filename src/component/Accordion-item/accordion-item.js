import React, {useState} from "react";
import AccordionList from "../Accordion-list/accordion-list";
import uniqid from "uniqid";

export default function AccordionItem({item, data, deep, order}) {
    const [opened, setOpened] = useState(false);

    const renderNextLevel = (data, item, deep, order) => {
        const filteredData = data.filter(o => o[`${order[deep]}`].includes(item));
        return <AccordionList data={filteredData} deep={deep + 1} order={order} />;
    };

    const renderItems = (data) => {
        return (
            <ul>
                {data.map(o => <li key={uniqid()}>{o.name}</li>)}
            </ul>
        );
    }

    return (
        <div>
            <header  onClick={() => setOpened(!opened)}>{item}</header>
            {opened &&
                <div >
                    {deep === (order.length - 1) ? renderItems(data) : renderNextLevel(data, item, deep, order)}
                </div>
            }
        </div>
    )
}