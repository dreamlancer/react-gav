import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducer'
import { createLogger } from 'redux-logger'

const initialState = {
    userInfo:
        typeof window !== 'undefined' && localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : {},
    
}

console.log('initialState', initialState)

const LoggerMiddleware = createLogger()

let conmposEnhancer
if (process.browser) {
    conmposEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

export const store = createStore(
    rootReducer,
    initialState,
    // conmposEnhancer(applyMiddleware(thunk, LoggerMiddleware))
    applyMiddleware(thunk, LoggerMiddleware)
)