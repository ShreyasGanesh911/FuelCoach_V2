//import { useState } from 'react'
import { useEffect, useState } from "react";
import {Props} from "../../UserCred";
import { FormLayout } from "../../UserCred";
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

type Data = {
  success:boolean,
  message:string
}
export default function StepFive({cred}:Props) {
  const [coomplete,setComplete] = useState<boolean>(false)
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
  }
    console.log(cred)
    useEffect(()=>{
      SignUser()
    })
  return (
  <>
    <form className=' border py-4 px-5 bg-white form-body'>
    <h3 className='my-2 py-1'>Hey {cred.Name.charAt(0).toUpperCase().concat(cred.Name.slice(1))}</h3>
    <section className="h-75 displayFlex my-5" style={{flexDirection:"column"}}>
        <h1 className=''><i className="fa-regular fa-circle-check overflow-hidden" style={{fontSize:'120px',color:'green'}}></i></h1>
        <h4 className='py-1'>Your account has been created successfully</h4>
        <h5 className='py-1'>Please login to fuel Coach</h5>
        <Link to='/'> <button className='btn btn-warning'>Login</button></Link>
    </section>
    <div className="" style={{display:'flex',justifyContent:'center',alignItems:'end',flexFlow:'column'}}>
    <h6 className='w-25'>Thank you</h6>
    <h6 className='w-25'>-From Fuel Coach</h6>
    </div>
    </form>
  </>
  )
}
