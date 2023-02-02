import { createContext, useEffect, useState } from "react";

export const DarkModeContaxt=createContext()

export const DarkModeContaxtProvider=({children})=>{

    const[darkMode,setDarkMode]=useState(JSON.parse(localStorage.getItem('darkMode'))|| false)

    const toggle=()=>{
        setDarkMode(!darkMode)
    }

    useEffect(()=>{
        localStorage.setItem("darkMode",darkMode)
    },[darkMode])

    return(
        <DarkModeContaxt.Provider value={{darkMode,toggle}}>{children}</DarkModeContaxt.Provider>
    )
}
