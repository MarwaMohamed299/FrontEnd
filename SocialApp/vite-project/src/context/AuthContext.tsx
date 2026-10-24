import { createContext, useState } from 'react'
import type { ReactNode } from 'react'

type AuthContextValue = {
  token: string | null;
  updateToken: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  token: null,
  updateToken: () => {},
  logout: () => {},
});
export default function AuthContextProvider({children}: { children: ReactNode }) {
    let [ token , setToken] = useState(function(){ return localStorage.getItem('token')});
    function updateToken(token: string){
      localStorage.setItem('token',token)
      setToken(token)
    }
    function logout(){
      localStorage.removeItem('token')
      setToken(null)
    }

  return (
    <AuthContext.Provider value = { {token,updateToken,logout} }>
        {children}
    </AuthContext.Provider>
  )
}
