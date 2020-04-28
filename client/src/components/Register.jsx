import React, { useState } from 'react'

export default function Register(props) {
    //props destructure
    const { handleRegister, toogleRegis } = props

    //local state
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const register = (e) => {
        e.preventDefault()
        handleRegister(username, email, password)
    }

    return (
        <div className="col-6 bg-danger text-white" style={{borderRadius:"5%"}}>
            <h5 className="mt-3" style={{fontWeight:'bold', fontFamily:'helvetica'}}>Register</h5>
            <form className="text-left" style={{padding:'1em'}} onSubmit={register}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <small style={{cursor:'pointer'}} onClick={() => toogleRegis(false)}>Have an account? Login here</small>
        </div>
    )
}
