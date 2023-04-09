import { createContext, useContext, useState } from "react";

const AppContext = createContext("some");

const ContextProvider = ({ children }) => {

  const [state,setState] = useState({})


  return <AppContext.Provider value={{global:state,setGlobal:setState}}  >{children}</AppContext.Provider>;
};

export default ContextProvider;


export const useGetAppContext = () => useContext(AppContext)
