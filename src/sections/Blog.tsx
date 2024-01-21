import { useEffect, useState,CSSProperties } from 'react'
import BlogPost from '../components/BlogPost'
import Auth from '../CustomHooks/Auth'
import HashLoader from "react-spinners/HashLoader"
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
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
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
// const key:string = 'bdb6317eb5d844dd92ccd6c08ec5406f'
// const key:string = 'aa449ccac9ea482787e132d90f0d6a01'
export default function Blog() {
  const cookies = new Cookies()
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  // https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=aa449ccac9ea482787e132d90f0d6a01 
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
      setLoading(false)
    }
    else{
    console.log(json.articles)
    setLoading(false)
   setBlog(json.articles)
    }
    }catch(e){
      setView(false)
    }
  }
  useEffect(()=>{
    if(!cookies.get('MyAuth'))
    navigate('/')
    fetchNews()
    
    
  },[])
  return (
    <div className='page'>
      <h2 className='overflow-y-hidden py-2'>Blogs</h2>
      {loading?<div className='w-100 displayFlex' style={{height:"60vh"}}><HashLoader color='#ffc107' loading={loading} cssOverride={override} size={80} aria-label="Loading Spinner" data-testid="loader"/></div>:
     <>
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
    </>
}
    </div>
  )
}
