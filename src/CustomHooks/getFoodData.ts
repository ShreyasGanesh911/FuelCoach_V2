//const query = '1 poha';
type Result={
calories: number,
carbohydrates_total_g?: number,
cholesterol_mg?: number,
fat_saturated_g?: number,
fat_total_g?: number,
fiber_g?: number,
name?: string,
potassium_mg?: number,
protein_g?: number,
serving_size_g?: number,
sodium_mg?:number,
sugar_g?: number,
}
type Data = {
    success:boolean,
    result:Result[]
}
const key = "cLStwAiKjoo1aMlCpC80SA==vQXVCIc79yvN9mcE"
const url = 'https://api.api-ninjas.com/v1/nutrition?query='
export default async function getdata (query:string){
    try{
        const responce = await fetch("http://localhost:4000/FoodLog/search",{
            method:"POST",
            credentials: 'include',
            headers:{
              "Content-Type": "application/json",
              },
            body: JSON.stringify({ query:query }),
          })
       const data:Data = await responce.json()
       console.log(data)
       if(data.success)
        return data
        return {success:false,result:[]}
    }catch(e){
        return {success:false,result:[]}
    }
    
   
}