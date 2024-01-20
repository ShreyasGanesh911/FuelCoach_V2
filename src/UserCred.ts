import { Dispatch,SetStateAction } from "react"
export type FormLayout={
    Name:string,
    Email:string,
    Phone:number,
    Password:string,
    Gender:string,
    Weight:number,
    Height:number,
    BMI:number,
    BMR:number,
    Age:number,
    Daily_Intake:number,
    Food_pref:number,
    Activity_rate:number,
    Goal:number,
    DOB:string,
    month:number,
    year:number
}

export type Form = {
    Email:boolean,
    Password:boolean,
    Phone:boolean,
    Name:boolean,
}
export type Props={
    cred :FormLayout,
    setCred:Dispatch<SetStateAction<FormLayout>>;
    step:number,
    setStep:Dispatch<SetStateAction<number>>
  }

  export const Month=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
//   export function handlePrev(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){

//   }