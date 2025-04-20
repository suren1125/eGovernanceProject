import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode'

export const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const authenticate = async () => {
      try {
        const token = localStorage.getItem("access-token");
       
        if (!token) {
          console.log("No token available");
          return;
        }
        const decoded = jwtDecode(token);
        if(!decoded){
          console.log("erorr in decoded")
        }
        setUser(decoded);
        console.log(decoded);
        
        
      } catch (error) {
        console.error("Authentication Error:", error);
        localStorage.removeItem("access-token");
        setUser(null);
      }
    };

    authenticate();
  }, []);

  const logout = () => {
    console.log("logging out")
    localStorage.removeItem('access-token'); 
    setUser(null); 
  };

  return <AuthUserContext.Provider value={{ user, setUser ,logout }}>{children}</AuthUserContext.Provider>;
};