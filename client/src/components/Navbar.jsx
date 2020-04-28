import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
//action import
import { userLogout } from '../slices/userSlice'
import { useHistory } from 'react-router-dom'

export default function Navbar(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)

    const logout = () => {
        dispatch(userLogout())
        history.push('/')
    }

    return (
        <ul className="nav bg-dark text-white fixed-top">
            <li className="nav-item p-3 mr-auto">
                <button className="btn btn-light" style={styles.btnText} onClick={() => props.handleShow(true)}>Add new Todo</button>
            </li>
            <li className="nav-item mx-auto">
                <h3 style={styles.middle}>Todo Application</h3>
            </li>
            <li className="nav-item p-3 ml-auto">
                <button className="btn btn-danger" style={styles.btnText} onClick={logout}>Logout</button>
            </li>
        </ul>
    )
}

const styles = {
    btnText: {
        fontFamily: 'Indie Flower',
        fontSize:'20px',
        fontWeight:'bolder'
    },
    middle: {
        fontFamily:'Lobster', 
        fontSize:'50px', 
        letterSpacing:'2px', 
        textShadow:'2px 2px 10px white', 
        color:'#9c2a39',
        paddingTop:'0.1em',
        marginRight:'40px'
    }
}