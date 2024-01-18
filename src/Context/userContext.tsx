import { Dispatch, ReactNode, SetStateAction, createContext,useState } from "react"
interface UserContextType{
    user:Number,
    setUser: Dispatch<SetStateAction<Number>>
}
const defaultState = {
    user:0,
    setUser:(user:Number)=>{}
} as UserContextType
export const UserContext = createContext<UserContextType>(defaultState)
interface Provider{
    children:ReactNode
}
export default  function UserState({children}:Provider){
    const[user,setUser] = useState<Number>(Number(localStorage.getItem("Auth")))
    return(
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
    )
};

