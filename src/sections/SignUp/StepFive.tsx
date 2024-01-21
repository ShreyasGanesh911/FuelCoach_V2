//import { useState } from 'react'
import { useEffect, useState,CSSProperties } from "react";
import {Props} from "../../UserCred";
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
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
  const[complete,setComplete] = useState<boolean>(false)
  let [loading, setLoading] = useState(true);
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
    useEffect(()=>{
      SignUser()
    })
  return (
  <>
    <form className=' border py-4 px-5 bg-white form-body'>
      {loading?<div className='w-100 displayFlex' style={{height:"60vh"}}><HashLoader color='#ffc107' loading={loading} cssOverride={override} size={80} aria-label="Loading Spinner" data-testid="loader"/></div>:
        <>
        <h3 className='my-2 py-1 font-monospace'>Hey {cred.Name.charAt(0).toUpperCase().concat(cred.Name.slice(1))}</h3>
    <section className="h-75 displayFlex my-5 table-font" style={{flexDirection:"column"}}>
        <h1 className=''><i className="fa-regular fa-circle-check overflow-hidden" style={{fontSize:'120px',color:'green'}}></i></h1>
        <h4 className='py-1 '>Your account has been created successfully</h4>
        <h5 className='py-1'>Please login to fuel Coach</h5>
        <Link to='/'> <button className='btn btn-warning'>Login</button></Link>
    </section>
        </>
      
      }
    
   
    </form>
  </>
  )
}
