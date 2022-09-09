import { useState } from "react";
import { GlobalContext, MyMessageContextType } from ".";


export const GlobalContextProvider = ({ children }: any) => {

    const [message, setMessage] = useState<MyMessageContextType>({} as MyMessageContextType);
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    return <GlobalContext.Provider value={{
        message, setMessage, isLoading, setIsLoading, isAuthenticated, setIsAuthenticated, setToken, setUser, token, user
    }}>
        {children}
    </GlobalContext.Provider >
}
