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
            washed: '#4e4e4e',
        },
        error: {
            main: '#b24545'
        }
    },
    typography: {
        
        htmlFontSize: '10px',
        fontFamily: 'Montserrat',
        
        header: { 
            light: {
                color: '#eee'
            },
            large: {
              
                lineHeight: '1.1em',
                fontWeight: '700',
                fontSize: '8rem',
            },
            media: {
                '@media(max-width: 1000px)': {
                    fontSize: '6em',
                    lineHeight: '1.2em'
                }
            }
            
        },
        subheader: { 
            large: {
                color: '#d2d2d2de',
                fontSize: '3em',
                lineHeight: '1.4em',
            },
            medium: {
                color: 'black',
                fontSize: '1.6em',
                lineHeight: '1.2em',
            },
            small: {
                color: '#969696de',
                fontSize: '1.1em',
            },
            media: {
                '@media(max-width: 1000px)': {
                    lineHeight: '1.5em'
                }
            }
        },
        card: {
            large: {
                fontSize: '2em',
                color: '#222',

            },
            small: {
                fontSize: '1.2em',
                color: '#1b1b1bde'
            },
            input: {
                fontSize: '1.2em',
                marginTop: '15px',
            },
            submit: {
                fontSize: '1.2em',
                marginTop: '25px'
            }
        }
    },
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
