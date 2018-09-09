
import ReactDOM from 'react-dom'
import React from 'react'
import $ from 'jquery'
import 'typeface-roboto'
import Favicon from 'react-favicon'
import '../../public/scss/main.scss'
import '@mdi/font/scss/materialdesignicons.scss'
import { applyMiddleware, createStore } from 'redux'
import myReducer from './reducers/index'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { ConnectedRouter, routerMiddleware, push } from "react-router-redux"
import createHistory from "history/createBrowserHistory"

import App from './App.jsx'
import Logo from "../../public/images/logo/sign-in.png";

const history = createHistory()
const middleware = applyMiddleware(routerMiddleware(history), thunk)

export const store = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware)

ReactDOM.render(<div><Favicon url={Logo} /><Provider store={store}><ConnectedRouter history={history}><App /></ConnectedRouter></Provider></div>, document.querySelector('#root'));
