import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import {Provider} from 'react-redux';
import {store} from './store/index.js'
import {BrowserRouter} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { 
            main: '#c5c1f5',
            extraLight: '#8482A0',
            bright: '#aba7de'
     
        },
        black: {
            main: '#1A1A1A',
            washed: '#1e1e1e',
        }
    }
})

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
