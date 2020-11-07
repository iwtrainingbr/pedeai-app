import React, {useEffect, useState} from 'react';
import {Divider} from "@material-ui/core";
import {API_URL} from "../../config/Config";
import "bootstrap/scss/bootstrap.scss";

export default function Invoice() {
    const [orderInProgress, setOrderInProgress] = useState([]);

    useEffect(() => {
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

    return (
      <div className={"mt-3"} align={"center"} style={{padding: 10}}>
          <div style={{backgroundColor: '#ede4ab', padding: 10}}>
              <h1>CONTA PARCIAL</h1>
              <Divider/>

              <table className={"table table-sm table-borderless"}>
                  <thead align={"left"}>
                      <tr>
                          <th>Item</th>
                          <th>Qtd</th>
                          <th>Preço Unit.</th>
                          <th>Preço Total</th>
                      </tr>
                  </thead>
                  <tbody>
                  {orderInProgress.map(order => {
                      return order.items.map(item => {
                          return (
                              <tr>
                                  <td>{item.name}</td>
                                  <td>{item.quantity}</td>
                                  <td>R$ {parseFloat(item.price)/item.quantity}</td>
                                  <td>R$ {item.price}</td>
                              </tr>
                          )
                      })
                  })}
                  </tbody>
                  <tfoot>
                      <tr>
                          <th colSpan={3}>TOTAL</th>
                          <th>R$ 289,90</th>
                      </tr>
                  </tfoot>
              </table>
          </div>
      </div>
    );
}
