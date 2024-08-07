import React, { useState, Dispatch,SetStateAction, useEffect,CSSProperties } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  "../Styles/LogFood.css"
import getdata from '../CustomHooks/getFoodData';
import {MyToastWarn} from "../components/Toastbar"
import HashLoader from "react-spinners/HashLoader"
import { Responce, Food , Data } from '../Types';
import { useNavigate } from 'react-router-dom';

type Props = {
    setShow: Dispatch<SetStateAction<boolean>>;
}

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

export default function LogFoodModal({setShow}:Props) {
    const navigate = useNavigate()
    let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffc107");
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
        setShowtype(false)
        setLoading(true)
        //------------------------------------------------------------------------------------------------------------------------
       const res:Data = await getdata(`1  ${log.FoodName}`)
       console.log(res)
       
       if(!res.success){
        setResult(false)
        setLoading(false)
       
       } 
       else{
        console.log(`IN ELSE ${res}`)
        setBaseCal(res.result[0].calories)
        setLog({...log,Calories:res.result[0].calories})
        res.result.length=1
        setArray(res.result)
        setResult(true)
        setLoading(false)
        navigate('/LogFood')
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
                <input type="text" className='form-control w-50 mx-3 table-font' placeholder="Try typing 'Dosa'" onChange={(e)=>setLog({...log,[e.target.name]:e.target.value})} name='FoodName' value={log.FoodName} />
                <button className='btn btn-warning mx-2' onClick={handleClick}>Search</button>
            </label>
        {showType && <h2 className='text-center opacity-50 py-3'>Try typing something</h2>}
        {loading?  <HashLoader color={color} loading={loading} cssOverride={override} size={80} aria-label="Loading Spinner" data-testid="loader"/>:
        <section className='displayFlex my-3'style={{flexDirection:'column'}}>
        {result?(array?.map((e:Responce)=>{
            return(
                <>
                <div className='w-75 border displayFlex my-2 py-2' style={{justifyContent:"space-evenly"}} key={e.fat_saturated_g}>
                    <div className='w-25'>
                    <h4 className='table-font'>{e.name?.charAt(0).toUpperCase().concat(e.name?.slice(1)) }</h4>
                    <h5 className='text-warning table-font'>{(e.calories * log.Qty).toFixed(2)} cal</h5>
                    
                    </div>
                  
                    <div className=''>
                    <ul className="pagination my-2" >
    
            <li className=""><button className={`btn btn-dark ${log.Qty===1?'disabled':''}`}onClick={()=>setLog({...log,Qty:log.Qty-1,Calories:(log.Qty-1)*baseCal})}>-</button></li>
            <li className="page-item"><button className="btn ">{log.Qty}</button></li>
            <li className="page-item"><button className='btn btn-dark'onClick={()=>setLog({...log,Qty:log.Qty+1,Calories:(log.Qty+1)*baseCal})}>+</button></li>
            </ul>
                    </div>
                    <input type="text" className='form-control w-25 text-center table-font' name="Tag" value={log.Tag} placeholder='Add a tag' onChange={(e)=>setLog({...log,[e.target.name]:e.target.value})} required/>
                    <div className=''>
                        <button className='btn btn-warning table-font' onClick={addFood}>Add</button>
                    </div>
                    <div>

                    </div>
                </div>
                
                <div className='border w-75 border-warning'>
                    <h5 className='mx-3 py-2 table-font '>Nutritional facts per serving *</h5>
                        <ul className=' '>
                            <li className='mx-1 table-font'>Carbs : {array[0].carbohydrates_total_g} g</li>
                            <li className='mx-1 table-font'>Cholesterol : {array[0].cholesterol_mg} g</li>
                            <li className='mx-1 table-font'>Saturated Fats : {array[0].fat_saturated_g} g</li>
                            <li className='mx-1 table-font'>Total Fats : {array[0].fat_total_g} g</li>
                            <li className='mx-1 table-font'>Fiber : {array[0].fiber_g} g</li>
                            <li className='mx-1 table-font'>Potassium : {array[0].potassium_mg} g</li>
                            <li className='mx-1 table-font'>Protein : {array[0].protein_g} g</li>
                            <li className='mx-1 table-font'>Sodium : {array[0].sodium_mg} g</li>
                            <li className='mx-1 table-font'>Sugar : {array[0].sugar_g} g</li>
                        </ul>
                    </div>

                </>
            )
        })):<h2 className='text-center opacity-50'>No data found</h2>}
        </section>
}

      </div>
      <ToastContainer />
    </div>
  )
}
