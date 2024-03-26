//import { useState } from 'react'
import {useState,CSSProperties } from "react";
import {Props} from "../../Types/UserCred";
import {useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader"
type Data = {
  success:boolean,
  message:string
}
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function StepFive({cred}:Props) {
  const navigate = useNavigate()
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    await SignUser()
    navigate('/')
  }
  let [loading, setLoading] = useState(false);
  const SignUser =async()=>{
    const responce = await fetch('http://localhost:4000/user/signup',{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      credentials:'include',
      body:JSON.stringify(cred)
    })
    const data:Data = await responce.json()
    if(data.success)
      console.log(data.message)
    else
      console.log(data.message)
    setLoading(false)
  }
    console.log(cred)
  return (
  <>
    <form className=' border py-4 px-5 bg-white form-body font-regular' onSubmit={handleSubmit}>
      {loading?<div className='w-100 displayFlex' style={{height:"60vh"}}><HashLoader color='#ffc107' loading={loading} cssOverride={override} size={80} aria-label="Loading Spinner" data-testid="loader"/></div>:
        <>
        <h3 className='my-2 py-1 '>Hey {cred.Name.charAt(0).toUpperCase().concat(cred.Name.slice(1))}</h3>
    <section className="h-75 displayFlex my-5 " style={{flexDirection:"column"}}>
        <h1 className=''><i className="fa-regular fa-circle-check overflow-hidden" style={{fontSize:'120px',color:'green'}}></i></h1>
        <h4 className='py-1 '>Your account is almost completed</h4>
        <h5 className='py-1'>Please login to fuel Coach</h5>
       
         <button className='btn btn-warning font-regular'>Get Started</button>
    </section>
        </>
      
      }
    
   
    </form>
  </>
  )
}
