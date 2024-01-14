import React from 'react'

export default function Measurementscard() {
  const alt:string = 'https://mumbai.jankidevipublicschool.in/Content/Schools/JPS/images/news-default.png'
  return (
    <div className='w-75 border my-5 displayFlex' style={{height:"20vh",borderRadius:'5px'}}>
    <div style={{height:"90%",width:"30%"}}><img style={{width:'100%',height:'100%',objectFit:'cover'}} src={alt} alt="https://www.bournemouthwater.co.uk/siteassets/news/default-news-article-image.jpg" /></div>
    <div style={{width:'65%',height:'100%'}} className='mx-3'>
      <h5 className='py-2'>BMI</h5>
      <span>Calculate now</span>
      <div style={{display:'flex',flexFlow:'row-reverse',paddingTop:'6vh'}}><button className='btn btn-outline-dark'>Find Out</button></div>
    </div>
    </div>
  )
}
