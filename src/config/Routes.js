import React from 'react';
import { Switch, Route } from 'react-router';

const Home = React.lazy(() => import('../pages/Home'));
const Menu = React.lazy(() => import('../pages/Menu'));

export default function Routes(props) {
  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/cardapio" component={Menu}/>
    </Switch>
  );
}
