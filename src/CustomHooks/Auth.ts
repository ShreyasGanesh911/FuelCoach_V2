import Cookies from "universal-cookie"

export default async function Auth() {
    const cookie = new Cookies()
   // const token = localStorage.getItem("Auth")
     const token = await cookie.get('MyAuth')
     console.log(token===undefined)

    if(token===undefined)
        return false
    else
        return true
}
