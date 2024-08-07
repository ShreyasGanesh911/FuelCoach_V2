import { ToastContainer } from "react-toastify"
import { MyToastSuccess, MyToastWarn } from "./Toastbar"
import { useState } from "react"
import { TableProps } from "../Types"
import { useNavigate } from "react-router-dom"

type Value ={
  FoodHash:number,
  Calories:number
}
export default function TableChild(props:TableProps) {
  const navigate = useNavigate()
    const [confirm,setConfirm] = useState<boolean>(false)
    const handleClick = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        setConfirm(false)
        const tablevalue:Value = JSON.parse(e.currentTarget.value)
        console.log(tablevalue.FoodHash,tablevalue.Calories)
        const responce = await fetch('http://localhost:4000/FoodLog/remove',{
          method:"POST",
          mode:"cors",
          headers:{
            "Content-Type": "application/json",
          },
          credentials:"include",
          body:JSON.stringify({FoodHash:tablevalue.FoodHash,Calories:tablevalue.Calories})
        })
        const data = await responce.json()
        if(data.success){
          MyToastSuccess(data.Message)
          navigate('/LogFood')
        }
          
        else
        MyToastWarn("Oops something went wrong")
  
    }
  return (
    <>
      <tr key={props.FoodHash}>
      <th scope="row">{props.count}</th>
      <td>{props.Tag}</td>
      <td>{props.FoodName}</td>
      <td>{props.Qty}</td>
      <td>{props.Calories}</td>
     
       <td>
        <><button  className={`btn btn-dark px-5 ${!confirm?"":"d-none"}`} onClick={()=>setConfirm(true)}><i className="fa-solid fa-delete-left fa-l"></i></button></>
        <>
          <button className={`btn btn-danger ${confirm?"":"d-none"}`} onClick={()=>setConfirm(false)}><i className="fa-regular fa-circle-xmark"></i></button>
          <button className={`btn btn-success mx-2 text-center ${confirm?"":"d-none"}`} value={JSON.stringify({FoodHash:props.FoodHash,Calories:props.Calories})} onClick={handleClick}><i className="fa-solid fa-circle-check "></i></button>
        </>
        
        </td> 
    </tr>
    <ToastContainer/>
    </>
  )
}
