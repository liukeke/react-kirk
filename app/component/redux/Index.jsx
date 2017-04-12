import React from 'react'
import { createStore ,compose,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Main from './components/Main'
import reducer from './reducers'
const middleware = [ thunk ];
const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(...middleware));
const Entry = () => (
    <Provider store={store}>
        <div>
            <Main />
        </div>
    </Provider>
)

export default Entry;