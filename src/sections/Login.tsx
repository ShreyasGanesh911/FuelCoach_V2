import { useContext, useEffect, useState } from "react"
import '../App.css'
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Context/userContext"
import { MyToastError } from "../components/Toastbar"
import { ToastContainer } from "react-toastify"
import Cookies from "universal-cookie"
// import dotenv from 'dotenv';
// dotenv.config()
export default function Login() {
  const cookie = new Cookies()
  const navigate = useNavigate()
  const {user,setUser} = useContext(UserContext)
  type Message={
    success:boolean,
    message:string,
    User_ID:number
  }
  const loginNow = async()=>{
    const responce = await fetch('http://localhost:4000/user/login',{
      method:"POST",
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
        },
      body: JSON.stringify({ Email:cred.email, Password:cred.password }),
    })
    const data:Message = await responce.json();
    if(data.success){
      navigate('/overview')
      localStorage.setItem("Auth",String(data.User_ID))
      cookie.set('MyAuth',cred.email,{ path: '/' })
      setUser(data.User_ID)
    }
    else{
      MyToastError(data.message)
    }

  }
  const [cred,setCred]=useState({email:'',password:''})
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
    e.preventDefault()
    let name:string = e.target.name
    let value:string = e.target.value
    setCred({...cred,[name]:value})
  }
  const submitCred = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>):void=>{
    e.preventDefault()
    loginNow()
    console.log(cred)
  }
  useEffect(()=>{
    const token = cookie.get('MyAuth')
    if(token)
      navigate('/overview')
  })
  return (
    <div className='introPage 'style={{display:'flex',justifyContent:'center',alignItems:'center',flexFlow:'column'}}>
      <div className="w-25  text-center">
        <h1 className="py-2"> <i className="fa-solid fa-charging-station fs-2 overflow-y-hidden mx-2 text-warning"></i>Fuel Coach</h1>
      </div>
      <form className="w-25  px-2 py-2">
  <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" name='email' value={cred.email} onChange={handleOnChange}/>
  <label htmlFor="floatingInput">Email address</label>
</div>
  <div className="form-floating mb-3">
  <input type="password" name='password' minLength={8} value={cred.password} className="form-control"  onChange={handleOnChange}/>
  <label htmlFor="floatingInput">Password</label>
</div>
  <button type="submit" className="btn btn-warning" onClick={submitCred}>Login</button>
</form>
<ToastContainer/>
    </div>
  )
}
