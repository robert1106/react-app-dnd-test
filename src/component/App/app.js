import React, {useEffect, useState} from "react";
import {request} from "../../service/data-request";
import AccordionList from "../Accordion-list/accordion-list";

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import uniqid from 'uniqid';

const SortableItem = SortableElement(({value}) =>
    <li className="sortable-element">{value[0].toUpperCase()+value.slice(1)}</li>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul className="sortable">
            {items.map((value, index) => (
                <SortableItem key={uniqid()} index={index} value={value} />
            ))}
        </ul>
    );
});

export default function App() {

    const [orderList, setOrderList] = useState(["size", "color", "mood", "shape", "material"]);
    const [data, setData] = useState([]);

    useEffect(() => {
        request('https://gist.githubusercontent.com/CJRoman/53790acd766cd2820da6bbf884235cec/raw/5e392796d26c956c2585c1a29a1d4ead1487fb63/items.json')
            .then((res) => {
                setData(res);
            });
    }, [])

    const onSortEnd = ({oldIndex, newIndex}) => {
        let arr = arrayMoveImmutable(orderList, oldIndex, newIndex);
        setOrderList(arr);
    }

    return (
        <>
            <SortableList items={orderList} onSortEnd={onSortEnd} axis='x'/>
            <AccordionList data={data} deep={0} order={orderList}/>
        </>
    )
}