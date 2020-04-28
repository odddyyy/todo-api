import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { userLogin } from '../slices/userSlice'
import axios from 'axios'
import Swal from 'sweetalert2'

//components import
import Login from '../components/Login'
import Register from '../components/Register'


const SERVER = 'http://localhost:3001'

export default function Home() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    //local state
    const [regis, setRegis] = useState(false)

    //login function
    const login = async (email, password) => {
        try {
            const { data } = await axios({
                method: 'POST',
                url: `${SERVER}/login`,
                data: {
                    email,
                    password
                }
            })
            dispatch(userLogin(data))
            Swal.fire({
                position:'top-end',
                icon:'success',
                text:'Login successfull',
                showConfirmButton: false,
                timer: 1500
            })
            history.push('/todo')
        } catch (err) {
            Swal.fire({
                icon:'warning',
                text: err.response.data
            })
        }
    }

    // register function
    const register = async (username, email, password) => {
        try {
            const { data } = await axios({
                method: 'POST',
                url: `${SERVER}/register`,
                data: {
                    username,
                    email,
                    password
                }
            })
            dispatch(userLogin(data))
            Swal.fire({
                icon:'success',
                text:`Thank you for registering ${username}`,
                showConfirmButton: false,
                timer: 1500
            })
            history.push('/todo')
        } catch (err) {
            Swal.fire({
                icon:'warning',
                text: err.response.data
            })
        }
    }

    return (
        <div style={styles.main}>
            <div className="container">
                <div className="row" style={{paddingTop:'32vh', marginLeft:'6em'}}>
                    {!regis ? 
                        <Login handleLogin={login} toogleRegis={() => setRegis(true)}/> : 
                        <Register handleRegister={register} toogleRegis={() => setRegis(false)}/>}   
                </div>
            </div>
        </div>
    )
}

const styles = {
    header: {
        fontFamily: 'Helvetica',
        fontSize: '50px',
        letterSpacing: '5px',
        paddingTop:'2em',
        color: 'black',
        textShadow: '1px 1px 30px red'
    },
    main: {
        backgroundImage: 'url("https://forum.layerbb.com/uploads/screenshots/b38df1a-o-TODO-LIST-facebook.jpg")',
        width:'100%',
        height:'100vh',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }
}