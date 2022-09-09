import { createContext } from "react";
import { UserClass } from "../../models/User";

export type MyMessageContextType = {
    text: string;
    severity: "success" | "info" | "warning" | "error";
    open: boolean;
    title: string;

}

export type GlobalContextType = {
    message: MyMessageContextType;
    setMessage: (v: any) => void;
    isLoading: boolean;
    setIsLoading: (v: boolean) => void;
    user: UserClass;
    setUser: (v: UserClass | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
    token: string | null;
    setToken: (v: string | null) => void;
};

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
