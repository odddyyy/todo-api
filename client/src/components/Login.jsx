import React, { useState } from 'react'

export default function Login(props) {
    //props destructure
    const { handleLogin, toogleRegis } = props

    //login state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = (e) => {
        e.preventDefault()
        handleLogin(email, password)
    }

    return (
        <div className="col-6 bg-dark text-white" style={{borderRadius:"5%"}}>
            <h5 className="mt-3" style={{fontWeight:'bold', fontFamily:'helvetica'}}>Login</h5>
            <form className="text-left" style={{padding:'1em'}} onSubmit={login}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" style={{marginTop:'13vh'}}>Submit</button>
            </form>
            <small style={{cursor:'pointer'}} onClick={() => toogleRegis(true)}>Don't have an account ? register here</small>
        </div>
    )
}
