export interface Responce{
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

    export interface Food{
        Calories:number,
        Tag:string,
        FoodName:string,
        Qty:number
    }
    export interface Data{
        success:boolean,
        
        result:Responce[]
    }
    export type TableResult={
        Calories:number,
        date:string,
        Tag:string,
        FoodName:string,
        Qty:number,
        FoodHash:number
      }
    export type TableProps ={
        Calories:number,
      Tag:string,
      FoodName:string,
      Qty:number,
      FoodHash:number,
      count:number
    }

    export type BlogResponse = {
        author:string|null,
        content:string|null,
        description:string|null,
        publishedAt:string|null,
        source:{id:string|null,name:string|null},
        title:string|null,
        url:string,
        urlToImage:string,
      
      }
    export  type UserResult = {
        Age:number,
        Name:string,
        BMI:number|string,
        BMR:number,
        Daily_Intake:number,
        Gender:string,
        Height:number|string,
        Weight:string|number,
      }
      export type ProfileResult = {
        Age:number,
        Name:string,
        BMI:number|string,
        BMR:number,
        Daily_Intake:number,
        Gender:string,
        Height:number|string,
        Weight:string|number,
        Email:string,
        Phone:number,
        // Consumed:number
      }
    export const sideBarMenu = [
        {favicon:"fa-solid fa-chart-simple",tag:'Overview',link:'/overview'},
        {favicon:"fa-solid fa-utensils",tag:'Log Food',link:'/LogFood'},
        {favicon:"fa-solid fa-bowl-food",tag:'Recipes',link:'/recipes'},
        {favicon:"fa-solid fa-newspaper",tag:'Blogs',link:'/blogs'},
        {favicon:"fa-solid fa-user",tag:'Profile',link:'/profile'},
        // {favicon:"fa-solid fa-notes-medical",tag:'Health Log',link:'/profile'},  
        {favicon:"fa-solid fa-question",tag:'About',link:'/about'},
        ]
    export const form = {Name:'',Email:'',Phone:91,Password:'',Gender:'',Weight:35,Height:180,BMI:0,BMR:0,Age:0,Daily_Intake:0,Food_pref:1,Activity_rate:1.200,Goal:0,DOB:'',month:1,year:2000}