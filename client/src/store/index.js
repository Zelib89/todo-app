import { saveState, loadState } from '../utils/localStorage'
import { throttle } from '../utils/throttle'
import { createStore } from 'redux'
import rootReducer from '../reducers'

const persistedState = loadState()

const store = createStore(
    rootReducer,
    persistedState
)

store.subscribe(
    throttle(() => {
        saveState({
            notes: store.getState().notes
        })
    },
    1000)
)

export default store