import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {blueGrey} from '@material-ui/core/colors';

import store, {history} from './store/configureStore';
import App from './containers/app/AppContainer';

const mountNode = document.getElementById('root');
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: blueGrey
    }
});

// Used to log in if token is valid

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>
    </MuiThemeProvider>,
    mountNode
);
