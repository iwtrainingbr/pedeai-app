import React from 'react';
import {AppBar, Toolbar, Button, Typography, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './style.scss';

export default function TopBar(props) {
  return (
    <div className={"topbar"}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={"menu-button"} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={"title"}>
            <img onClick={() => props.history.push('/')} width={160} src={"/img/pedeai-white.svg"}/>
          </Typography>
          <Button onClick={() => props.history.push('/meus-pedidos')} className={"my-orders"}>Meus Pedidos</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
