import '../styles/global.css';
import { Provider } from 'react-redux'
import { store } from '../store'
import React from 'react';

const App = ({ Component,  pageProps}) => {
    return (<Provider store={store}>
        <Component {...pageProps} />
        </Provider>);
}
export default App;