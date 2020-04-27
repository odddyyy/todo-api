import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { userLogin } from '../slices/userSlice'
import axios from 'axios'
import Swal from 'sweetalert2'

const SERVER = 'http://localhost:3001'

export default function Home() {
    const dispatch = useDispatch()
    const history = useHistory()
    //login state
    const [emailLog, setEmailLog] = useState('')
    const [passwordLog, setPasswordLog] = useState('')

    //register state
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    //login form submission
    const login = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios({
                method: 'POST',
                url: `${SERVER}/login`,
                data: {
                    email: emailLog,
                    password: passwordLog
                }
            })
            dispatch(userLogin(data))
            Swal.fire({
                icon:'success',
                text:'Login successfull'
            })
            history.push('/todo')
        } catch (err) {
            Swal.fire({
                icon:'warning',
                text: err.response.data
            })
        }
    }

    //register form submission
    const register = async (e) => {
        e.preventDefault()
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
                <div className="row" style={{paddingTop:'35vh', opacity:'80%'}}>
                    <div className="col-6 bg-dark text-white rounded">
                        <h5 className="mt-3">Login</h5>
                        <form className="text-left" style={{padding:'1em'}} onSubmit={e => login(e)}>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" placeholder="Enter email" required onChange={(e) => setEmailLog(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" placeholder="Password" required onChange={(e) => setPasswordLog(e.target.value)} />
                            </div>
                            <button type="submit" class="btn btn-primary" style={{marginTop:'13vh'}}>Submit</button>
                        </form>
                    </div>
                    <div className="col-6 bg-danger text-white rounded">
                        <h5 className="mt-3">Register</h5>
                        <form className="text-left" style={{padding:'1em'}} onSubmit={e => register(e)}>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Username</label>
                                <input type="text" class="form-control" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
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
        backgroundImage: 'url("https://media.istockphoto.com/photos/business-plan-todo-list-or-reminder-concept-female-hand-holding-black-picture-id1021975288?k=6&m=1021975288&s=612x612&w=0&h=YSkXxPDIW03bDsreuOBTWvXMiihWv6-Icrs03dEgwI4=")',
        width:'100%',
        height:'100vh',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }
}