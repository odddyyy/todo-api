import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
//import components
import Navbar from '../components/Navbar'
import TodoCard from '../components/TodoCard'

export default function Todo() {
    const history = useHistory()
    const user = useSelector(state => state.user)
    // if (!user.loggedIn) history.push('/')
    return (
        <>
            <Navbar />
            <div className="container" style={{marginTop:'6em'}}>
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <TodoCard />
                        </div>
                    </div>
                    <div className="col-6">
                        Finished
                    </div>
                </div>
            </div>
        </>
    )
}
