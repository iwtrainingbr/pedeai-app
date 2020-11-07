import React, {useEffect, useState} from "react";
import "bootstrap/scss/bootstrap.scss";
import {API_URL} from "../../config/Config";
import {Button} from "@material-ui/core";

export default function Orders(props) {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        let orderIds = JSON.parse(
            localStorage.getItem('order') || '[]'
        );

        for (let id in orderIds) {
            fetch(API_URL+`/item/${id}.json`)
                .then(response => response.json())
                .then(response => {
                    let price = new Intl.NumberFormat('pt-BR').format(response.price * orderIds[id]);

                    setOrder(order => [
                        ...order,
                        {
                            name: response.name,
                            price: price,
                            quantity: orderIds[id],
                            id: id,
                        }
                    ])
                });
        }

    }, []);

    const cancelOrder = () => {
        setOrder([]);
        localStorage.setItem('order', '[]');
    }

    return (
        <div className={"m-4"}>
            <Button color={"primary"} variant={"outlined"} onClick={cancelOrder}>
                Cancelar Pedido
            </Button>

            <table className={"table mt-3 table-hover table-striped"}>
                <thead className={"thead-dark"}>
                    <tr>
                        <th>Item</th>
                        <th>Qtd</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map(item => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>R$ {item.price}</td>
                                <td>..</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
