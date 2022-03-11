import React, {useEffect, useState} from "react";
import {request} from "../../service/data-request";
import AccordionList from "../Accordion-list/accordion-list";

import uniqid from 'uniqid';

export default function App() {

    const [orderList, setOrderList] = useState(["size", "color", "mood", "shape", "material"]);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        request('https://gist.githubusercontent.com/CJRoman/53790acd766cd2820da6bbf884235cec/raw/5e392796d26c956c2585c1a29a1d4ead1487fb63/items.json')
            .then((res) => {
                setData(res);
            });
    }, [])

    const dragStartHandler = (event, order) => {
        setCurrentOrder(order)
    }
    const dragLeaveHandler = (event) => {
    }
    const dragEndHandler = (event) => {
    }
    const dragOverHandler = (event) => {
        event.preventDefault();
    }
    const dropHandler = (event, order) => {
        event.preventDefault();
        setOrderList(orderList.map(o => {
            if(o === order) {
                return currentOrder;
            }
            if (o === currentOrder) {
                return order;
            }
            return o;
        }))
    }

    return (
        <>
            <ul className="sortable">
                {orderList.map((order) => {
                    return (
                        <li onDragStart={(event) => dragStartHandler(event, order)}
                            onDragLeave={(event) => dragLeaveHandler(event)}
                            onDragEnd={(event) => dragEndHandler(event)}
                            onDragOver={(event) => dragOverHandler(event)}
                            onDrop={(event) => dropHandler(event, order)}
                            draggable={true}
                            className="sortable-element"
                            key={uniqid()}>
                            {order}
                        </li>
                    )
                })}
            </ul>
            <AccordionList data={data} deep={0} order={orderList}/>
        </>
    )
}