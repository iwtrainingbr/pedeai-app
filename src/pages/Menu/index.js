import React, {useEffect, useState} from 'react';
import "./styles.scss";
import {API_URL} from "../../config/Config";
import {CardContent, Card, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Add, Remove} from "@material-ui/icons";

export default function Menu(props) {
    const category = props.match.params.category;
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        setOrder(JSON.parse(
            localStorage.getItem('order') || '[]'
        ));

        fetch(API_URL+'/item.json')
            .then(response => response.json())
            .then(response => {
                let items = [];
                for(let id in response) {
                    response[id].id = id;
                    items.push(response[id]);
                }

                setItems(items);
            })
    }, []);

    const addItem = (id) => {
        let quantity = 1;
        let localOrder = order;

        if (localOrder[id]) {
            quantity = localOrder[id] + 1;
        }

        localOrder = {
            ...localOrder,
            [id]: quantity
        };
        setOrder(localOrder);

        localStorage.setItem('order', JSON.stringify(localOrder));
    }

    const removeItem = (id) => {
        if (!order[id] || order[id] === 0) {
            return;
        }

        let localOrder = order;

        localOrder = {
            ...localOrder,
            [id]: localOrder[id] - 1,
        };
        setOrder(localOrder);

        localStorage.setItem('order', JSON.stringify(localOrder));
    }

    return (
      <div className={"page-menu"}>
          <h1>{category}</h1>

          {items.map(item => {
              const {name, description, price} = item;

              if (item.category !== category) {
                  return;
              }

              return (
                  <Card className={"card-item"}>
                      <CardContent>
                          <h2>{name}</h2>
                          <Typography className={"description"}>{description}</Typography>

                          <Typography className={"price"} variant={"h6"}>
                              R$ {price}
                          </Typography>

                          <Button onClick={() => removeItem(item.id)} size={"small"} color={"primary"} variant={"outlined"}><Remove/></Button>

                          <span className={"quantity"}>{order[item.id] || 0}</span>

                          <Button onClick={() => addItem(item.id)} size={"small"} color={"primary"} variant={"outlined"}><Add/></Button>
                      </CardContent>
                  </Card>
              )
          })}
        {/* Snack bar */}
      </div>
    )
}
