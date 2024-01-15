import React, { useState, Dispatch,SetStateAction, useEffect } from 'react';
import  "../Styles/LogFood.css"
import getdata from '../CustomHooks/getFoodData';
type Props = {
    setShow: Dispatch<SetStateAction<boolean>>;
}
interface Responce{
    calories?: number,
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

export default function LogFoodModal({setShow}:Props) {
    const [search,setSearch] = useState('')
    const [result,setResult] = useState(true)
    const arr:Responce={}
    const [array,setArray] = useState([])
    const handleClick = async()=>{
       const res = await getdata(`1 ${search}`)
       if(!res){
        console.log("no data")
        setArray([])
        setResult(false)
       }
       
       else{
        console.log(res)
        setArray(res)
        setResult(true)
       }
       console.log(res)
    }
  return (
    <div className="modal-wrapper">
      <div className="border w-50 h-50 bg-light">
            <div className='d-flex' style={{flexDirection:'row-reverse'}}><button className='btn  mx-3 my-3' onClick={()=>setShow(false)}><i className="fa-solid fa-x"></i></button></div>
            <label htmlFor='searchFood ' className='w-100 displayFlex my-5'>
                <input type="text" className='form-control w-50 mx-3' onChange={(e)=>setSearch(e.target.value)} name='result' value={search} />
                <button className='btn btn-warning mx-2' onClick={handleClick}>Search</button>
            </label>
        {array.length===0 && <h2 className='text-center opacity-50'>Try typing something</h2>}
        {array.length!==0 && <h1>Result </h1>}
        <section className='displayFlex my-3'>
        {result?(array?.map((e:Responce)=>{
            return(
                <div className='w-75 border displayFlex' style={{justifyContent:"space-evenly"}}>
                    <div className='w-50'>
                    <h4>{e.name?.charAt(0).toUpperCase().concat(e.name?.slice(1)) }</h4>
                    <h4>{e.calories}</h4>
                    </div>
                    <div className=''>
                    <ul className="pagination my-2" >
    
            <li className=""><button className=' btn btn-dark'>-</button></li>
            <li className="page-item"><button className="btn  ">1</button></li>
            <li className="page-item"><button className='btn btn-dark'>+</button></li>
            </ul>
                    </div>
                    <div className=''>
                        <button className='btn btn-warning'>Add</button>
                    </div>
                </div>
                
            )
        })):<h2 className='text-center opacity-50'>No data found</h2>}
        </section>

      </div>
    </div>
  )
}
