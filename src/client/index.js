import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {App} from './App';
import './index.scss';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('the-todo-project')
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => render(require('./App').App));
}
