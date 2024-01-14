import React from 'react'
import Measurementscard from '../../components/Measurementscard'

export default function Measurements() {
  type Array = {title:string,desc:string,link:string}
  const array:Array[] = [
    {title:'BMI',desc:"Body Mass Index (BMI) is a person’s weight in kilograms divided by the square of height in meters. A high BMI can indicate high body fatness. BMI screens for weight categories that may lead to health problems, but it does not diagnose the body fatness or health of an individual.",link:'qw'},
    
  ]
  return (
    <div className='page'>
      <h2 className='py-2'>Measurements</h2>
      <div className='w-100 ' >
      <Measurementscard/>
      <Measurementscard/>
      <Measurementscard/>
      </div>
    </div>
  )
}
