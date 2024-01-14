import React, { useEffect, useState } from 'react'
import BlogPost from '../components/BlogPost'
import { Interface } from 'readline'
type DataResponse = {
  author:string|null,
  content:string|null,
  description:string|null,
  publishedAt:string|null,
  source:{id:string|null,name:string|null},
  title:string|null,
  url:string|null,
  urlToImage:string,

}
// const key:string = 'bdb6317eb5d844dd92ccd6c08ec5406f'
// const key:string = 'aa449ccac9ea482787e132d90f0d6a01'
export default function Blog() {
  // https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=aa449ccac9ea482787e132d90f0d6a01
  type News = {content:string,img:string,description:string,url:string}
  
  //https://newsapi.org/v2/top-headlines?category=health&apiKey=bdb6317eb5d844dd92ccd6c08ec5406f
  const [blog,setBlog] = useState([])
  const [view,setView] = useState(true)
  const fetchNews = async()=>{
    try{
    const url:string = 'https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=bdb6317eb5d844dd92ccd6c08ec5406f'
    const data = await fetch(url)
    const json = await data.json();
    if(json.status!=='ok'){
      setView(false)
    }
    else{
    console.log(json.articles)
   setBlog(json.articles)
    }
    }catch(e){
      setView(false)
    }
  }
  useEffect(()=>{
    fetchNews()
  })
  return (
    <div className='page'>
      <h2 className='overflow-y-hidden py-2'>Blogs</h2>
     {
      view?(
      blog.map((e:DataResponse)=>{
        return(
          <BlogPost title={e.title} description={e.description} img={e.urlToImage} newsUrl={e.url}/>
        )
      }))
      :
      <>There was an Error fetching </>
    } 
    </div>
  )
}
// author: 
// 
// content: 
//description
// : 

// publishedAt
// : 

// source
// : 
// {id: null, name: 'Livemint'}
// title
// : 
// "Plant-based compound cytisine may help people to quit smoking - Mint Lounge"
// url
// : 
// "https://lifestyle.livemint.com/health/wellness/plantbased-compound-cytisine-quit-smoking-nicotine-replacement-therapy-111704098445656.html"
// urlToImage
// : 
// "https://images.livemint.com/img/2024/01/01/1140x641/oc-gonzalez-nOVWrtav4Mw-unsplash_1704103062122_1704103114103.jpg"