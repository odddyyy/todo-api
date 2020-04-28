import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

//actions
import { getAllTodo } from '../slices/todoSlice'

const SERVER = 'http://localhost:3001'

export default function TodoCard() {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todo)

    const getTodos = async () => {
        const { data } = await axios({
            method:'GET',
            url: `${SERVER}/todos`,
            headers: {token:localStorage.token}
        })
        dispatch(getAllTodo(data))
    }
    
    useEffect(() => {
        getTodos()
    },[])

    if (!todos) {
        return <div>Loading</div>
    }
    
    return(
        <>
        {todos.todos.map((i, idx) => {
            return(
                <div className="col-6 mt-3" key={idx}>
                    <div className="card">
                        <div className="card-body">
                            {i.title}
                        </div>
                    </div>
                </div>
            )
        })}
        </>
    )
}
