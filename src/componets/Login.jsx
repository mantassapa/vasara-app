import React, { useState } from 'react'
import { getDatabase } from 'firebase/database'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const Login = ({showLogin, setShowLogin}) => {
    const db = getDatabase()
    const auth = getAuth()
    
    const [loading, serLoading] = useState(false)
    const [registerForm, setRegisterForm] = useState({
        name:"",
        lastname:"",
        email:"",
        password:"",
    })
    const [passwordr, setPasswordr] = useState("")
    const [loginForm, setLoginForm] = useState({
        email:"",
        password:""
    })
    const [registerError, setRegisterError] = useState("")
    
    const login =(ev)=>{
        ev.preventDefault()
        signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
        .then((userCredential)=>{
            console.log(userCredential.user);
            setLoginForm({
                email:"",
                password:""
            })
            setShowLogin(0)
        })
        .catch((err)=>setRegisterError(err.code))

    }
    const logChange =(el)=>{
        const {name, value} = el.target
        setLoginForm((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const register = (ev)=>{
        ev.preventDefault()

        if(registerForm.password===passwordr){
            setRegisterError("")
            createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password)
            .then((userCredential)=>{
                console.log(userCredential.user);
                setRegisterError("")
                setRegisterForm({
                    name:"",
                    lastname:"",
                    email:"",
                    password:"",
                })
                setPasswordr("")
                setShowLogin(0)
            })
            .catch((err)=>setRegisterError(err))
            
        }else{setRegisterError("Passwords don't match!")}
    }
    const regChange =(el)=>{
        const {name, value} = el.target
        setRegisterForm((prev)=>({
            ...prev,
            [name]:value
        }))
    }
 
  return (
    <div className='login_page'>Login page
        {showLogin===1?
        <form className='login' onSubmit={login}>
            <h3>Login</h3>
            <h4 style={{color:"red"}}>{registerError}</h4>
            <label htmlFor="login_email">Email:</label>
            <input type="email" id='login_email' name='email' value={loginForm.email} onChange={logChange} required/>
            <label htmlFor="login_password">Password:</label>
            <input type="text" id='login_password'name='password' value={loginForm.password} onChange={logChange} required/>
            <button type='submit'>Login</button>
            <button type='button'  onClick={()=>setShowLogin(2)} className='login_switch'>Register</button>
        </form>:null}
        {showLogin===2?
        <form className='register' onSubmit={register}>
            <h3>Register</h3>
            <h4 style={{color:"red"}}>{registerError}</h4>
            <label htmlFor="register_name">Name:</label>
            <input type="text" id='register_name' name='name' value={registerForm.name} onChange={regChange} required/>
            <label htmlFor="register_lastname">Lastname:</label>
            <input type="text" id='register_lastname' name='lastname' value={registerForm.lastname} onChange={regChange} required/>
            <label htmlFor="register_email">Email:</label>
            <input type="email" id='register_email' name='email' value={registerForm.email} onChange={regChange} required/>
            <label htmlFor="register_password">Password:</label>
            <input type="password" id='register_password' name='password' value={registerForm.password} onChange={regChange} required/>
            <label htmlFor="register_passwordr">Repeat password:</label>
            <input type="password" id='register_passwordr' name='passwordr' value={passwordr} onChange={(el)=>{setPasswordr(el.target.value)}} required/>
            <button type='submit'>Register</button>
            <button type='button' onClick={()=>setShowLogin(1)} className='login_switch'>Login</button>
        </form>:null}
    </div>
  )
}

export default Login