import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, logoutRequest } from "../services/user.services";
import { node } from "prop-types";

export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [error, setError] =  useState([])

  const register = async (user) => {
    try {

      const res = await registerRequest(user)
      console.log(res);
      if (!res.error) {
        setUser(res.newUser)
        setIsLogin(true)
      } else {
        setError(res.message)
        console.log(res.message);
      } 

    } catch (error) {
      console.log(error);
    }
  }

  const login = async (values) => {

    try {
      
      const res = await loginRequest(values)
      if (!res.error) {
        setUser(res.user)
        setIsLogin(true)
      } else {
      
        setError(res.message)
        console.log(error);
      
      }

    } catch (error) {
      console.log(error);
    }
  }
  
  
  const logout = async () => {
    
    try {

      const res = await logoutRequest()
      console.log(res);
      setUser(null)
      setIsLogin(false)

    } catch (error) {
      console.log(error);  
    }

  }

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        user,
        isLogin,
        setIsLogin,
        error,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}

AuthProvider.propTypes ={
  children: node
}
