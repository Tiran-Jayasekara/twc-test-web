"use client";
import React from 'react'
import { createContext, useEffect, useState } from "react";


export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [token, setToken] = useState();
  const [contactButtonMsg, setContactButtonMsg] = useState('add new contact');

  useEffect(() => {
    const Savedtoken = JSON.parse(localStorage.getItem("token")) || {};
    setToken(Savedtoken);
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        setToken,
        token,
        contactButtonMsg,
        setContactButtonMsg
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalState