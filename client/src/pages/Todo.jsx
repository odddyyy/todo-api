import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
//import components
import Navbar from '../components/Navbar'
import TodoCard from '../components/TodoCard'
import AddTodo from '../components/AddTodo'
//actions
import { getAllTodo } from '../slices/todoSlice'

const SERVER = 'http://localhost:3001'

export default function Todo() {
    const history = useHistory()
    const user = useSelector(state => state.user)
    // if (!user.loggedIn) history.push('/')
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todo)
    //local state
    const [show, setShow] = useState(false);

    
    const finished = todos.todos.filter(i => {
        return i.status === true
    })
    const unfinished = todos.todos.filter(i => {
        return i.status === false
    })

    const getTodos = async () => {
        const { data } = await axios({
            method:'GET',
            url: `${SERVER}/todos`,
            headers: {token:localStorage.token}
        })
        await dispatch(getAllTodo(data))
    }

    const addNewTodo = async (title, description) => {
        try {
            const { data } = await axios({
                method: 'POST',
                url: `${SERVER}/todos`,
                headers: {token:localStorage.token},
                data: {title, description}
            })
        } catch (err) {
            console.log(err)
        }
        
    }

    const handleShow = (condition) => {
        setShow(condition)
    }
    
    useEffect(() => {
        getTodos()
    },[todos])

    return (
        <>
            <Navbar handleShow={handleShow}/>
            <div className="container" style={{marginTop:'6em'}}>
                <div className="row">
                    <div className="col-6 bg-dark">
                        <h4 style={styles.cardHeader} className="text-light">Unfinished Task</h4>
                        <div className="row">
                            <TodoCard todos={unfinished}/>
                        </div>
                    </div>
                    <div className="col-6 bg-danger" style={{minHeight:'100vh'}}>
                        <h4 style={styles.cardHeader}>Finished Task</h4>
                        <div className="row">
                            <TodoCard todos={finished}/>
                        </div>
                    </div>
                </div>
            </div>
            <AddTodo show={show} handleShow={handleShow} addNewTodo={addNewTodo}/>
        </>
    )
}

const styles = {
    cardHeader: {
        fontFamily: 'Righteous',
        marginTop: '30px'
    }
}
