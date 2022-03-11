import React from "react";
import AccordionItem from "../Accordion-item/accordion-item";
import uniqid from "uniqid";

export default function AccordionList({data, deep, order}) {
    const accorList = [...new Set(data.map(o => o[`${order[deep]}`]))];

    return (
        <ul>
            {accorList.map((item) => {
                return (
                    <AccordionItem item={item} data={data} deep={deep} order={order} key={uniqid()}/>
                )
            })}
        </ul>
    )
}