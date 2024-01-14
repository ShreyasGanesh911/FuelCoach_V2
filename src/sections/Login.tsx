import { useState } from "react"
import '../App.css'
export default function Login() {
  const [cred,setCred]=useState({email:'',password:''})
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
    e.preventDefault()
    let name:string = e.target.name
    let value:string = e.target.value
    setCred({...cred,[name]:value})
  }
  const submitCred = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>):void=>{
    e.preventDefault()
    console.log(cred)
  }
  return (
    <div className='introPage 'style={{display:'flex',justifyContent:'center',alignItems:'center',flexFlow:'column'}}>
      <div className="w-25  text-center">
        <h1 className="py-2"> <i className="fa-solid fa-charging-station fs-2 overflow-y-hidden mx-2 text-warning"></i>Fuel Coach</h1>
      </div>
      <form className="w-25  px-2 py-2">
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' value={cred.email} className="form-control" id="exampleInputEmail1" onChange={handleOnChange}  aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='password' minLength={8} value={cred.password} className="form-control"  onChange={handleOnChange} id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-warning" onClick={submitCred}>Login</button>
</form>
    </div>
  )
}
