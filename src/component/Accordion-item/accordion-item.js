import React, {useState} from "react";
import AccordionList from "../Accordion-list/accordion-list";
import uniqid from "uniqid";

export default function AccordionItem({item, data, deep, order}) {
    const [opened, setOpened] = useState(false);

    const showNextList = () => {
        const filteredData = data.filter(o => o[`${order[deep]}`].includes(item));
        return <AccordionList data={filteredData} deep={deep + 1} order={order} />;
    };

    const showName = () => {
        return (
            <ul className="item-name">
                {data.map(o => <li key={uniqid()}>{o.name}</li>)}
            </ul>
        );
    }

    return (
        <li className={"accordion-item "+("deep-"+deep)}>
            <header className="accordion-item-header" onClick={() => setOpened(!opened)}>{item}</header>
            {opened &&
                <div >
                    {deep === (order.length - 1) ? showName() : showNextList()}
                </div>
            }
        </li>
    )
}