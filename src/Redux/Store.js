import thunk from "redux-thunk"
import { applyMiddleware, combineReducers, createStore , compose} from 'redux';
import { friendsReducer } from './Friends/Reducer';
import { gotReducer } from "./Got/Reducer";
import { himReducer } from "./Hiymym/Reducer";

const rootReducer = combineReducers({
    friends: friendsReducer,
    got: gotReducer,
    him: himReducer
})

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk)
    )
)