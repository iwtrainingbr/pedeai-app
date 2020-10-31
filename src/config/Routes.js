import React from 'react';
import { Switch, Route } from 'react-router';

const Home = React.lazy(() => import('../pages/Home'));
const Menu = React.lazy(() => import('../pages/Menu'));
const Orders = React.lazy(() => import('../pages/Orders'));

export default function Routes(props) {
  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/cardapio/:category" component={Menu}/>
      <Route path="/meus-pedidos" component={Orders}/>
    </Switch>
  );
}
