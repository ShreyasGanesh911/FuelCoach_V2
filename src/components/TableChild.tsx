import { ToastContainer } from "react-toastify"
import { MyToastSuccess, MyToastWarn } from "./Toastbar"
import { useState } from "react"

type Props ={
    Calories:number,
  Tag:string,
  FoodName:string,
  Qty:number,
  FoodHash:number,
  count:number
}

export default function TableChild(props:Props) {
    const [confirm,setConfirm] = useState<boolean>(false)
    const handleClick = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        setConfirm(false)
        console.log(e.currentTarget.value)
        const responce = await fetch('http://localhost:4000/FoodLog/remove',{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          credentials:"include",
          body:JSON.stringify({FoodHash:e.currentTarget.value})
        })
        const data = await responce.json()
        if(data.success)
          MyToastSuccess(data.Message)
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
        <><button  className={`btn btn-dark px-5 ${!confirm?"visible":"visually-hidden"}`} onClick={()=>setConfirm(true)}><i className="fa-solid fa-delete-left fa-l"></i></button></>
        <>
          <button className={`btn btn-danger mx-2 ${confirm?"":"visually-hidden"}`} onClick={()=>setConfirm(false)}><i className="fa-regular fa-circle-xmark"></i></button>
          <button className={`btn btn-success mx-2 text-center ${confirm?"":"visually-hidden"}`} value={props.FoodHash} onClick={handleClick}><i className="fa-solid fa-circle-check "></i></button>
        </>
        
        </td> 
    </tr>
    <ToastContainer/>
    </>
  )
}
