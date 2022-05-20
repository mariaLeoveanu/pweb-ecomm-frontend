import { createStore, applyMiddleware, compose } from "redux"
import reducers from "./reducers/index"
import thunk from "redux-thunk"
// import { loadState, saveState } from "./localStorage";
import { auth } from "../firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const preloadedState = {
    account: auth.currentUser
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk)),
)

export const getEmail = state => {
    return state.account.user.email
}
