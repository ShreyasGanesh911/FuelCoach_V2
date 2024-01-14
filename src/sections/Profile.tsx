import React, { useState } from 'react'


export default function Profile() {
  const [edit,setEdit] =useState(false)
  type About = {name:string,email:string,phone:number,age:number,gender:string}
  const about:About = {name:'shreyas',email:'ShreyasIsNow@gmail.com',phone:9945333584,age:20,gender:'male'}
  const [info,setInfo] = useState(about)
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
    let value:string|number = e.target.value
    let name:string = e.target.name
    setInfo({...info,[name]:value})
  }
  return (
    <div className='page'>
      <h2 className='py-2'>Profile</h2>
      <div className='border' style={{height:'75vh',width:'90%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <div style={{height:'250px',width:'250px',borderRadius:'50%'}} className='bg-warning'></div>
      <div className='w-50 '>
            <h6 className="py-1">Name</h6>
            {!edit?
              <h6 className='mx-4 py-1 w-75 text-warning border-bottom'>{info.name}</h6>:
              <input className='mx-4 py-1 w-75 text-warning  form-control bg-light' type='text' value={info.name} name='name' onChange={handleChange} />   
          }
          </div>
      <div className='w-50 '>
            <h6 className="py-1">Email</h6>
            {!edit?
              <h6 className='mx-4 py-1 w-75 text-warning border-bottom'>{info.email}</h6>:
              <input className='mx-4 py-1 w-75 text-warning  form-control bg-light' type='text' value={info.email} name='email' onChange={handleChange} />   
          }
          </div>
      <div className='w-50 '>
            <h6 className="py-1">Phone</h6>
            {!edit?
              <h6 className='mx-4 py-1 w-75  text-warning border-bottom'>{info.phone}</h6>:
              <input className='mx-4 py-1 w-75 text-warning  form-control bg-light' type='tel' value={info.phone} name='phone'  onChange={handleChange}/>   
          }
          </div>
      <div className='w-50 '>
            <h6 className="py-1">Age</h6>
            {!edit?
              <h6 className='mx-4 py-1 w-75 text-warning border-bottom'>{info.age}</h6>:
              <input className='mx-4 py-1 w-75 text-warning  form-control bg-light' type='tel' value={info.age} name='age' onChange={handleChange} />   
          }
          </div>
      <div className='w-50 '>
            <h6 className="py-1">Gender</h6>
            {!edit?
              <h6 className='mx-4 py-1 w-75 text-warning border-bottom'>{info.gender}</h6>:
              <input className='mx-4 py-1 w-75 text-warning  form-control bg-light' disabled type='text' value={info.gender} name='gender'  />   
          }
          </div>
    <div>
    <button className='btn btn-warning my-2' onClick={()=>!edit?setEdit(true):setEdit(false)}>{!edit?<>Edit <i className="fa-solid fa-pen"></i></>:<>Done <i className  ="fa-solid fa-check"></i></>}</button>  
      </div>
      </div>
    </div>
  )
}
