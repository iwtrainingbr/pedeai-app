import React, {useEffect, useState} from 'react';
import {Card, CardActionArea, CardContent} from '@material-ui/core';
import {API_URL} from "../../config/Config";
import "./styles.scss";

export default function Home (props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(API_URL+'/category.json')
            .then(response => response.json())
            .then(response => {
                let categories = [];
                for (let id in response) {
                    categories.push(response[id]);
                }

                setCategories(categories);
            })
    }, []);

    return (
        <div className={"page-categories"}>
            <h1>Bem vindo</h1>

            {categories.map(category => {
                return (
                    <Card className={"card-category"}>
                        <CardActionArea onClick={() => {
                            props.history.push('/cardapio/'+category.name)
                        }}>
                            <CardContent>
                                <h2>{category.name}</h2>
                                <h4>{category.description}</h4>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            })}
        </div>
    );
}
