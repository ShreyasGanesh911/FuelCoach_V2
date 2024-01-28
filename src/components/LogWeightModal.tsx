import React, { Dispatch, SetStateAction,useState } from 'react'
import  "../Styles/LogFood.css"
import { MyToastError } from './Toastbar'
import { ToastContainer } from 'react-toastify'
type Props={
    show:boolean,
    setShow:Dispatch<SetStateAction<boolean>>
}
type Data = {
    success:boolean,
    message:string
}
export default function LogWeightModal({show,setShow}:Props) {
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(value===0)
        return MyToastError('Enter your weight')
        const responce = await fetch('http://localhost:4000/weight/add',{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            credentials:'include',
            body:JSON.stringify({Weight:value})
        })
        const data:Data = await responce.json()
        if(data.success)
            return setShow(false)
        MyToastError(data.message)
    }
    const [value,setValue] = useState<number>(60)
  return (
    <div className='modal-wrapper' >
        
        <form className="border  w-50 h-50 bg-light" onSubmit={handleSubmit}>
        <div className='d-flex' style={{flexDirection:'row-reverse'}}><button className='btn  mx-3 my-3' onClick={()=>setShow(false)}><i className="fa-solid fa-x"></i></button></div>
            <section className='displayFlex my-5'>
            <div className='w-50 displayFlex'>
            <input required className="form-control w-50 table-font" step={0.1} value={value} onChange={(e)=>setValue(Number(e.target.value))} style={{height:'70px',fontSize:"30px"}} type="number" min={0} max={180} />
            </div>
            <button className='btn btn-warning table-font' >Add weight</button>
            </section>
        </form>
    <ToastContainer/>
    </div>
  )
}
