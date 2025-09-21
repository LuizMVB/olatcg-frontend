import React from "react";
import {createContext, useContext, useEffect, useMemo,useState} from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setTokenState] = useState(sessionStorage.getItem("token"));
    //once the login is done, a new token takes place
    //referenced in LoginForm.js
    const setToken = (newToken) => {
    setTokenState(newToken);
    }

    useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;