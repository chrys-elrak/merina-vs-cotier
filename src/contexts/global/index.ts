import { createContext } from "react";

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
};

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
