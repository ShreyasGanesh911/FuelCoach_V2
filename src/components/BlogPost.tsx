import React from 'react'
type Props ={
    title:string|null,
    description:string|null,
    newsUrl:string,
    img:string|null
}
export default function BlogPost(props:Props) {
  const alt:string = 'https://mumbai.jankidevipublicschool.in/Content/Schools/JPS/images/news-default.png'
  return (
    <div className='w-75 border my-5 displayFlex' style={{height:"20vh",borderRadius:'5px'}}>
    <div style={{height:"90%",width:"30%"}}><img style={{width:'100%',height:'100%',objectFit:'cover'}} src={`${props.img===null?alt:props.img}`} alt="https://www.bournemouthwater.co.uk/siteassets/news/default-news-article-image.jpg" /></div>
    <div style={{width:'65%',height:'100%'}} className='mx-3'>
      <h5 className='py-2 table-font'>{props.title}</h5>
      
      <a className='nav-link border-bottom border-warning ' style={{display:'inline-block'}} target='_blank' href={props.newsUrl}>Read more</a>
    </div>
    </div>
  )
}
