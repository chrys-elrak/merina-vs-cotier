import { Snackbar } from "@material-ui/core";
import { Alert, AlertColor, AlertTitle } from "@mui/material";
import { useContext } from "react";
import { GlobalContext, MyMessageContextType } from "../contexts/global";


export const MyAlert = () => {
    const { message, setMessage } = useContext(GlobalContext);

    const closeAction = () => {
        setMessage((m: MyMessageContextType) => ({ ...m, open: false }));
    }

    return <Snackbar open={message?.open} autoHideDuration={6000} onClose={closeAction}>
        <Alert
            severity={message?.severity as AlertColor}
            sx={{ width: '100%' }}
            onClose={closeAction}>
            <AlertTitle>{message?.title}</AlertTitle>
            {message?.text}
        </Alert>
    </Snackbar>
}