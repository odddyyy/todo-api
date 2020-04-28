import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        loggedIn: false
    },
    reducers: {
        userLogin: (state, action) => {
            const { token, username } = action.payload
            localStorage.setItem('token', token)
            state.username = username
            state.loggedIn = true
        },
        userLogout: (state, action) => {
            localStorage.removeItem('token')
            state.username = null
            state.loggedIn = false
        }
    }
})

export const { userLogin, userLogout } = userSlice.actions

export default userSlice.reducer