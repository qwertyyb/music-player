import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { dataSource } from './actions'
import { playingReducer, dataSourceReducer } from './reducers'

const reducers = combineReducers({
  playing: playingReducer,
  dataSource: dataSourceReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
)

export type AppState = ReturnType<typeof reducers>

store.dispatch<any>(dataSource.loadDataSource())

export default store
