import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: []
    },
    reducers: {
        getAllTodo: (state, action) => {
            state.todos = [...action.payload]
        }
    }
})

export const { getAllTodo } = todoSlice.actions

export default todoSlice.reducer