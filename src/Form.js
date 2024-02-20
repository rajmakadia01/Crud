import { useState } from "react"
import './Form.css'

const Form = ({onLogin}) => {


    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    // const [LoginSuccess,setLoginSuccess] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        onLogin(userName,password)
        // setLoginSuccess(true)
    }


    return (
        <>


<div className='body'>
        <div className='box'>
            <form onSubmit={handleLogin}>
                <h2>Sign in</h2>
                <div className='inputBox'>
                <input type='text' required   value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    <span>User Name</span>
                    <i></i>
                </div>
                <div className='inputBox'>
                <input type='password' required   value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <span>Password</span>
                    <i></i>
                </div>
                <div className='links'>
                    <a href='#'>Forgot Password</a>
                    <a href='#'>Signup</a>
                </div>
                <input type="submit"  value="Login"  />
            </form>

        </div>
    </div>
        </>
    )



}

export default Form