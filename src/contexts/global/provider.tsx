import { useState } from "react";
import { GlobalContext, MyMessageContextType } from ".";


export const GlobalContextProvider = ({ children }: any) => {

    const [message, setMessage] = useState<MyMessageContextType>({} as MyMessageContextType);
    const [isLoading, setIsLoading] = useState(false);

    return <GlobalContext.Provider value={{ message, setMessage, isLoading, setIsLoading }}>
        {children}
    </GlobalContext.Provider>
}
