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
            main: '#3B3952',
            extraLight: '#8482A0'
        },
        black: {
            main: '#1A1A1A'
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
