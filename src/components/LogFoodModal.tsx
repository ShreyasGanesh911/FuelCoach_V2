import React, { useState, Dispatch,SetStateAction, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  "../Styles/LogFood.css"
import getdata from '../CustomHooks/getFoodData';
import {MyToastSuccess,MyToastWarn} from "../components/Toastbar"
type Props = {
    setShow: Dispatch<SetStateAction<boolean>>;
}
interface Responce{
    calories: number,
    carbohydrates_total_g?: number,
    cholesterol_mg?: number,
    fat_saturated_g?: number,
    fat_total_g?: number,
    fiber_g?: number,
    name?: string,
    potassium_mg?: number,
    protein_g?: number,
    serving_size_g?: number,
    sodium_mg?:number,
    sugar_g?: number,
    }
interface Food{
    Calories:number,
    Tag:string,
    FoodName:string,
    Qty:number
}
interface Data{
    success:boolean,
    result:Responce[]
}
export default function LogFoodModal({setShow}:Props) {
     let userFood:Food={
        Calories:0,Tag:"",FoodName:"",Qty:1
     }
    const [result,setResult] = useState(true)
    const [showType,setShowtype] = useState(true)
    const [baseCal,setBaseCal] = useState(0)
    const [log,setLog] = useState<Food>(userFood)
    
    const [array,setArray] = useState<Responce[]>()
    const handleClick = async()=>{
        if(log.FoodName===''){
            return MyToastWarn("Can't leave it empty")
        }
       const res:Data = await getdata(`1  ${log.FoodName}`)
       if(!res.success){
        console.log("no data")
        setShowtype(false)
        setResult(false)
       } 
       else{
        console.log(`IN ELSE ${res}`)
        setBaseCal(res.result[0].calories)
        setLog({...log,Calories:res.result[0].calories})
        res.result.length=1
        setArray(res.result)
        setShowtype(false)
        setResult(true)
       }   
    }
    const addFood = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        if(log.Tag==="")
            return MyToastWarn("Can't leave tag empty")
        console.log(log)
        
        const responce = await fetch('http://localhost:4000/FoodLog/add',{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            credentials:'include',
            body: JSON.stringify(log)
        })
        const data = await responce.json()
        if(data.success)
            setShow(false)
    }
  return (
    <div className="modal-wrapper">
      <div className="border w-50 h-50 bg-light">
            <div className='d-flex' style={{flexDirection:'row-reverse'}}><button className='btn  mx-3 my-3' onClick={()=>setShow(false)}><i className="fa-solid fa-x"></i></button></div>
            <label htmlFor='searchFood ' className='w-100 displayFlex my-5'>
                <input type="text" className='form-control w-50 mx-3' onChange={(e)=>setLog({...log,[e.target.name]:e.target.value})} name='FoodName' value={log.FoodName} />
                <button className='btn btn-warning mx-2' onClick={handleClick}>Search</button>
            </label>
        {showType && <h2 className='text-center opacity-50'>Try typing something</h2>}
        
        <section className='displayFlex my-3'style={{flexDirection:'column'}}>
        {result?(array?.map((e:Responce)=>{
            return(
                <div className='w-75 border displayFlex my-2' style={{justifyContent:"space-evenly"}} key={e.fat_saturated_g}>
                    <div className='w-25'>
                    <h4>{e.name?.charAt(0).toUpperCase().concat(e.name?.slice(1)) }</h4>
                    <h4>{(e.calories * log.Qty).toFixed(2)} cal</h4>
                    </div>
                  
                    <div className=''>
                    <ul className="pagination my-2" >
    
            <li className=""><button className={`btn btn-dark ${log.Qty===1?'disabled':''}`}onClick={()=>setLog({...log,Qty:log.Qty-1,Calories:(log.Qty-1)*baseCal})}>-</button></li>
            <li className="page-item"><button className="btn ">{log.Qty}</button></li>
            <li className="page-item"><button className='btn btn-dark'onClick={()=>setLog({...log,Qty:log.Qty+1,Calories:(log.Qty+1)*baseCal})}>+</button></li>
            </ul>
                    </div>
                    <input type="text" className='form-control w-25 text-center' name="Tag" value={log.Tag} placeholder='Add a tag' onChange={(e)=>setLog({...log,[e.target.name]:e.target.value})} required/>
                    <div className=''>
                        <button className='btn btn-warning' onClick={addFood}>Add</button>
                    </div>
                    
                </div>
                
            )
        })):<h2 className='text-center opacity-50'>No data found</h2>}
        </section>

      </div>
      <ToastContainer />
    </div>
  )
}
