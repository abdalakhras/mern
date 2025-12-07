import React,{createContext,useContext,useState} from "react";

import { getCurrenUser,loginForm as apiLogin , logOut as apiLogOut} from "../services/auth";

const Authcontext = createContext(null)

export function AuthProvider({children}){

    const [user,setUser] = useState(getCurrenUser())


    const login = async (email,password) => {
        const data = await apiLogin (email,password)
        setUser(data.user)
        return data
    }

    
    const logOut =()=>{
        apiLogOut()
        setUser(null)
    }


    return (
        <Authcontext.Provider value={{user,login,logOut}}>
            {children}
        </Authcontext.Provider>
    )
}
export function useAuth(){
    return useContext(Authcontext)
}