import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Routes from './routes';


import './App.css';
import 'typeface-poppins';
import DarkTheme from './styles/themes/dark';

function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
