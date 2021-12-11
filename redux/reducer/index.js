import { combineReducers } from "redux"

import { LoginReducer } from "./loginReducer"
import { OwnerListOfCarsReducer } from './ownerListOfCarsReducer'

const appReducers = combineReducers({
    userInfo: LoginReducer,
    ownerListOfCarsReducer: OwnerListOfCarsReducer
})

const rootReducer = (state, action) => {
    if (action.type === "FLAG") {
        state.flag = action.payload
    }
    return appReducers(state, action)
}

export default rootReducer