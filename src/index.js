import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Routes from './Routes'
import registerServiceWorker from './registerServiceWorker'
import './assets/scss/app.css'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, LOCATION_CHANGE } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import ui from './store/ui/reducers'
import createHistory from 'history/createBrowserHistory'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'
import { loadingBarMiddleware, loadingBarReducer } from 'react-redux-loading-bar'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'

const history = createHistory()
const middlewares = [
    thunk,
    promiseMiddleware(),
    routerMiddleware(history),
    loadingBarMiddleware({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE', LOCATION_CHANGE]
    })
]
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({ collapsed: true, predicate: (getState, action) => !action.type.includes('loading-bar') }))
}

let reducer = combineReducers({
    ui,
    router: routerReducer,
    loadingBar: loadingBarReducer
})
const persistedState = loadState()
const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    predicate: (getState, action) => !action.type.includes('loading-bar')
})
const store = createStore(reducer, persistedState, composeEnhancers(applyMiddleware(...middlewares)))

store.subscribe(
    throttle(() => {
        saveState({
            login: store.getState().login
        })
    }, 1000)
)
export default store
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
