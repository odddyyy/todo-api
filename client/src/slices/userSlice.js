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
    }
})

export const { userLogin } = userSlice.actions

export default userSlice.reducer