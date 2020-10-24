import React, {useEffect, useState} from 'react';
import "./styles.scss";
import {API_URL} from "../../config/Config";
import {CardContent, Card} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Add} from "@material-ui/icons";

export default function Menu(props) {
    const category = props.match.params.category;
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(API_URL+'/item.json')
            .then(response => response.json())
            .then(response => {
                let items = [];
                for(let id in response) {
                    items.push(response[id]);
                }

                setItems(items);
            })
    }, []);

    return (
      <div className={"page-menu"}>
          <h1>{category}</h1>

          {items.map(item => {
              if (item.category !== category) {
                  return;
              }

              return (
                  <Card className={"card-item"}>
                      <CardContent>
                          <h2>{item.name}</h2>

                          <Button size={"small"} color={"primary"} variant={"outlined"}><Add/></Button>
                      </CardContent>
                  </Card>
              )
          })}
        {/* Snack bar */}
      </div>
    )
}
