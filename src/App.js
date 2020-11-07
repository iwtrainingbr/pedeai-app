import React, { Suspense } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme';
import Routes from './config/Routes';
import TopBar from './components/TopBar';

function App() {
  const history = createBrowserHistory();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<h1>carregando...</h1>}>
          <Router history={history}>
            <TopBar history={history}/>

            <Routes/>
          </Router>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
