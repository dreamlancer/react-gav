import {
    OWNER_LIST_OF_CARS_FAIL,
    OWNER_LIST_OF_CARS_SUCCESS,
    OWNER_LIST_OF_CARS_REQUEST
} from '../../constants/owner'

const INITIAL_STATE = {}

export const OwnerListOfCarsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OWNER_LIST_OF_CARS_REQUEST:
            return state

        case OWNER_LIST_OF_CARS_SUCCESS:
            //localStorage.setItem('ownerListOfCars',JSON.stringify(action.payload))
            return action.payload

        case OWNER_LIST_OF_CARS_FAIL:
            return {
                error: action.payload,
            }

        default:
            return state
    }
}