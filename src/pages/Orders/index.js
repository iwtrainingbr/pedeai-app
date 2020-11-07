import React, {useEffect, useState} from "react";
import "bootstrap/scss/bootstrap.scss";
import {API_URL} from "../../config/Config";
import {Button, Divider, Typography, Accordion, AccordionSummary, AccordionDetails} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {CheckCircleOutline} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

function AccordionOrderInProgress(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.orders.map((order, id) => {
                let date = new Date(order.date);

                date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;

                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>
                                Pedido {id + 1} - {date}

                                <span className={"badge badge-secondary ml-3"}>
                                    {order.status || 'Aguardando'}
                                </span>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                {order.items.map(item => {
                                    return (
                                        <li>{item.quantity} {item.name} - R$ {item.price}</li>
                                    )
                                })}
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>
    );
}

export default function Orders(props) {
    const [order, setOrder] = useState([]);
    const [orderInProgress, setOrderInProgress] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let orderIds = JSON.parse(
            localStorage.getItem('order') || '[]'
        );

        for (let id in orderIds) {
            fetch(API_URL+`/item/${id}.json`)
                .then(response => response.json())
                .then(response => {
                    let realValue = response.price * orderIds[id];

                    let price = new Intl.NumberFormat('pt-BR').format(realValue);

                    setTotalPrice(totalPrice => totalPrice + parseFloat(realValue));

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

        fetch(API_URL+'/order.json')
            .then(response => response.json())
            .then(response => {
                let data = [];

                for (let id in response) {
                    data.push(response[id]);
                }

                setOrderInProgress(data);
            });
    }, []);

    const cancelOrder = () => {
        setOrder([]);
        setTotalPrice(0);
        localStorage.setItem('order', '[]');
    }

    const confirmOrder = () => {
        let dataOrder = {
            date: new Date(),
            items: order,
        };

        fetch(API_URL+'/order.json', {
            method: 'POST',
            body: JSON.stringify(dataOrder),
        });

        props.history.push('/');
        cancelOrder();
    };

    const sectionOrder = () => {
        if (totalPrice === 0) {
            return (
                <div className={"m-4"} align={"center"}>
                    <Typography>Adicione alguma coisa ao seu pedido.</Typography>

                    <Button color={"secondary"} onClick={() => props.history.push('/')}>
                        Ver categorias
                    </Button>

                    <div className={"mt-3"}>
                        <img width={200} src={'/img/empty.svg'} alt={"Empty"}/>
                    </div>

                </div>
            );
        }

        return (
            <>
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
                    <tfoot>
                    <tr className={"bg-info"}>
                        <td colSpan={2}>Total</td>
                        <td>R$ {totalPrice}</td>
                        <td>...</td>
                    </tr>
                    </tfoot>
                </table>

                <Button onClick={confirmOrder} color={"primary"} variant={"outlined"} fullWidth>
                    Confirmar Pedido
                </Button>
            </>
        )
    };

    return (
        <div className={"m-4"}>
            {sectionOrder()}

            <Divider/>

            <Typography className={"mt-5 text-center"} variant={"h5"}>
                Pedidos em Andamento
            </Typography>

            <AccordionOrderInProgress orders={orderInProgress}/>

            <div className={"mt-3"}>
                <Button onClick={() => props.history.push('/parcial')} color={"primary"} variant={"outlined"}>
                    Ver Conta Parcial
                </Button>
            </div>
        </div>
    );
}
