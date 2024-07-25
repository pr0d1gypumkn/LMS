import React, { createContext, useState } from 'react';

// Create a new context
const GlobalContext = createContext();

// Create a context provider component
const GlobalContextProvider = ({ children }) => {
    // Define your state variables here
    const [data, setData] = useState(null);
    const [makingRequest, setMakingRequest] = useState(false);
    // Define any functions or methods you need for your context
    
    // Provide the state and functions/methods to the children components
    return (
        <GlobalContext.Provider value={{ data, setData }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalContextProvider };