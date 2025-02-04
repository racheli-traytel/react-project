import { createContext, Dispatch } from "react";
import User from "../types/User";
import useReducer, { action } from "./useReducer";
import Login from "./Login";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { AppBar, Box, Toolbar } from "@mui/material";
import store from "./recipes/store";
import Home from "./home";
export const url = 'http://localhost:3000/api/user';
type UserContextType = {user:User,userDispatch: Dispatch<action>};
export const UserCotext = createContext<UserContextType>({user:{} as User,userDispatch: () => { }});

export default () => {
    const { user, userDispatch } = useReducer();


    return (
<Provider store={store}> 
    <UserCotext value={{user, userDispatch}}>
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            
            <AppBar 
                position="static" 
                sx={{ 
                    bgcolor: "#f8f8f8", 
                    boxShadow: 1, 
                    width: "100vw", 
                    left: 0, 
                    top: 0,
                    borderBottom: "2px solid #ddd", 
                    px: 3, 
                    py: 1,
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Login /> 
                    <Navbar />
                </Toolbar>
            </AppBar>

            {/* תוכן המרכז */}
            <Box sx={{
                flexGrow: 1,
                width: "100%", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                mt: 4, 
                padding: 2 
            }}>
 
                <Outlet /> 
                {/* <Home></Home> */}
            </Box>
        </Box>
    </UserCotext>
</Provider>
    );
};