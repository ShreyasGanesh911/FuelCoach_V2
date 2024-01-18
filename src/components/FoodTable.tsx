import React, { useEffect, useState } from 'react'
// import { MyToastSuccess,MyToastError, MyToastWarn } from './Toastbar'
import { ToastContainer, toast } from 'react-toastify'
import TableChild from './TableChild'
type Result={
  Calories:number,
  date:string,
  Tag:string,
  FoodName:string,
  Qty:number,
  FoodHash:number
}
type Data = {
  status:boolean,
  result:Result[]
}

export default function FoodTable() {
  const [table,setTable] = useState<Result[]>([])
  const[cal,setCal] = useState<number>(0)
 
  let calo = 0
  let count = 0
  const getData = async()=>{
    const responce = await fetch("http://localhost:4000/FoodLog/logged",{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
    const data:Data = await responce.json()
    setTable(data?.result)
    //console.log(data.result[0].Calories)
  }

  useEffect(()=>{
    getData()
  },[getData])
  return (
    <>{
      table.length===0?
      <div className="bg-dark text-white border displayFlex" style={{height:"25vh"}}>
        <h3 className='py-2'>No food logged for today</h3>
      </div>
      :
    <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Category</th>
      <th scope="col">Name</th>
      <th scope="col">Qty</th>
      <th scope="col">Calories</th>
      <th scope="col">Remove</th>
    </tr>
  </thead>
  <tbody>
    {table.map((e)=>{
      // setCal(cal+e.Calories)
      calo+=e.Calories
      count++
      return(
        <TableChild FoodName={e.FoodName} FoodHash={e.FoodHash} Tag={e.Tag} Qty={e.Qty} Calories={e.Calories} count={count} />
      )
    })}
        <tr>
        <td colSpan={1}></td>
        <td colSpan={3}>Total</td>
        <td>{calo}</td>
        <td></td>
    </tr>
  </tbody>
  <ToastContainer/>
</table>
}
</>
  )
}
