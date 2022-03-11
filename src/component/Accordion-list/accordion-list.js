import React from "react";
import AccordionItem from "../Accordion-item/accordion-item";
import uniqid from "uniqid";

export default function AccordionList({data, deep, order}) {
    const elementsData = [...new Set(data.map(o => o[`${order[deep]}`]))];

    return (
        <ul className="accordion-list">
            {elementsData.map((item) => {
                return (
                    <AccordionItem item={item} data={data} deep={deep} order={order} key={uniqid()}/>
                )
            })}
        </ul>
    )
}