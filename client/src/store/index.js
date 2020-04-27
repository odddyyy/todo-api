import { configureStore } from '@reduxjs/toolkit'
//import all reducers
import userReducer from '../slices/userSlice'

export default configureStore({
    reducer: {
        user: userReducer
    }
})
