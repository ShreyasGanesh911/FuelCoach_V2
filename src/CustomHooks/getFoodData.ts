//const query = '1 poha';
type Responce={
calories?: number,
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
const key = "cLStwAiKjoo1aMlCpC80SA==vQXVCIc79yvN9mcE"
const url = 'https://api.api-ninjas.com/v1/nutrition?query='
export default async function getdata (query:string){
    try{
        const data = await fetch(url+query,{
            method: 'GET',
           headers: {
               'X-Api-Key': key,
               contentType: 'application/json',
           },
           
       })
       const responce = await data.json()
       console.log(responce[0].name)
       return responce
    }catch(e){
        return false
    }
    
   
}