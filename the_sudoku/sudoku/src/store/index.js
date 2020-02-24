import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import createRootReducer from '../reducers'
import rootSaga from '../sagas'

// Redux saga
const sagaMiddleware = createSagaMiddleware()

// Redux persist
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}
const persistedReducer = persistReducer(persistConfig, createRootReducer())

const initialState = {}
const middleware = [sagaMiddleware]

export const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // process.env.NODE_ENV === 'development'
    //   ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //       window.__REDUX_DEVTOOLS_EXTENSION__()
    //   : null
  )
)
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
