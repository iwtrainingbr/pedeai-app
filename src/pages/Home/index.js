import React from 'react';
import { Button } from '@material-ui/core';

export default function Home (props) {
  return (
    <div>
      <h1>Página Inicial</h1>

      <Button variant="contained" color="primary">Primary</Button>
      <Button variant="contained" color="secondary">Secondary</Button>
    </div>
  );
}
