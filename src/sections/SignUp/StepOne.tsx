import {useState} from "react";
import {Form,Props} from "../../UserCred";
import "../../Styles/SignUp.css";
import { MyToastError } from "../../components/Toastbar";
type Data = {
  success:boolean,
  message:string
}
export default function StepOne({cred,setCred,step,setStep}:Props) {
  const checkUser = async()=>{
    const responce = await fetch('http://localhost:4000/user/checkUserExists',{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      credentials:'include',
      body:JSON.stringify({Email:cred.Email,Phone:Number(cred.Phone)})
    })
    const data:Data = await responce.json()
    if(data.success)
      return true
    else{
      MyToastError(data.message)
      return false
    }
      
  }
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    // check if all fields are filled
    // check if the number / email has been used
    if(await checkUser())
      setStep(step+1)
    
    
    
  }
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const name = e.target.name
    const value = e.target.value
    setCred({...cred,[name]:value})
    if(value==="")
    setForm({...form,[name]:true})
    setForm({...form,[name]:false})
  }
  const handleClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    const name = e.currentTarget.id
    console.log(name)
    setForm({...form,[name]:true})
  }
  const [form,setForm] = useState<Form>({Email:false,Password:false,Name:false,Phone:false})
  return (
    <>
      <form className=" form-body border py-4 px-5 bg-white" onSubmit={handleSubmit}>
        <section className="h-75 my-3">
        <div className="mb-3" onClick={handleClick} id="Name">
    <label htmlFor="exampleInputEmail1 " className="form-label font-monospace">Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="Name" value={cred.Name} required onChange={handleOnChange}/>
   
  </div>
        <div className="mb-3" onClick={handleClick} id="Email">
    <label htmlFor="exampleInputEmail1" className="form-label font-monospace">Email</label>
    <input type="email" className="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" name="Email"  onChange={handleOnChange} value={cred.Email}/>
  
  </div>
      <div className="mb-3" onClick={handleClick} id="Phone">
    <label htmlFor="exampleInputEmail1" className="form-label font-monospace">Phone</label>
    <input type="tel" className="form-control" id="exampleInputPhone1" aria-describedby="emailHelp" name="Phone" required onChange={handleOnChange} value={cred.Phone} maxLength={12} min={0}/>
    
  </div>
        <div className="mb-3" onClick={handleClick} id="Password">
    <label htmlFor="exampleInputEmail1" className="form-label font-monospace">Password</label>
    <input type='password' className="form-control" id="exampleInputPhone1" aria-describedby="emailHelp" name="Password" required onChange={handleOnChange} value={cred.Password} minLength={8} />
    </div>
  </section>
  <div style={{display:'flex',flexFlow:'row-reverse'}}>
    <button className="btn btn-warning" > Next</button>
  </div>
      </form>
    </>
  );
}
