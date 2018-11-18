import { LOCATION_CHANGE } from 'react-router-redux'

const initState = {
    test: true
}
const ui = (state = initState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return Object.assign({}, state, { test: false })
        case 'SET_TEST':
            return Object.assign({}, state, { test: action })
        default:
            return state
    }
}
export const getTest = state => {
    return state.ui.test
}
export default ui
