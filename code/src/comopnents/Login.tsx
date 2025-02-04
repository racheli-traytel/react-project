import { FormEvent, useContext, useRef, useState } from "react";
import { Button, Modal, Box, TextField } from "@mui/material";

import Loged from "./Loged";
import { url, UserCotext } from "./appLayot";
import axios from "axios";
import ErrorMessage from "./Error";
import UserStyle from "./styles/UserStyle";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { user, userDispatch } = useContext(UserCotext);
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
    const [isLogin, setIsLogin] = useState(false);
    const [open, setOpen] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    const hanleUser = async () => {
        setOpen(false);
        try {
            const u = url + '/' + (mode === 'signIn' ? 'login' : 'register');
            const res = await axios.post(u, {
                email: emailRef.current?.value,
                password: passwordref.current?.value
            });
            setIsLogin(true);
            console.log(res.data.user);

            if (res.data.user) {
                userDispatch({
                    type: 'LOG IN',
                    data: res.data.user
                })
            }
            else {
                userDispatch({
                    type: 'LOG IN',
                    data: {
                        id: res.data.userId,
                        firstName: '',
                        lastName: '',
                        email: emailRef.current?.value || '',
                        password: passwordref.current?.value || '',
                        address: '',
                        phone: ''
                    }
                })

            }
        }
        catch (e: any) {
            if (e.response && e.response.status === 400) {
                setErrorMessage("User already exists. Please log in.");
            } else if (e.response && e.response.status === 401) {
                setErrorMessage("You dont exist. please sigh up.");
            } else if (e.response && e.response.status === 404) {
                setErrorMessage("User not found. Please sign up.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again later.");
            }
        } finally {

            if (emailRef.current) emailRef.current.value = '';
            if (passwordref.current) passwordref.current.value = '';
        }
    };
    return (<>
        {!isLogin ? (
            <div style={{ display: "flex" }}><Button
                sx={{ margin: "5px",backgroundColor: 'black', color: 'white' }} variant="contained"
                onClick={() => { setOpen(!open); setMode('signIn'); setErrorMessage(null); }}>
                Log in
            </Button>
                <Button sx={{ margin: "5px", backgroundColor: 'black', color: 'white' }} variant="contained"
                    onClick={() => { setOpen(!open); setMode('signUp'); setErrorMessage(null); }} >
                    Sign up
                </Button>
            </div>) : (<Loged />)}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <Modal open={open} onClose={() => setOpen(false)}>
            <form action="" onSubmit={hanleUser}>
                <Box sx={UserStyle.loginStyle}>
                    <TextField label="email" inputRef={emailRef} fullWidth margin="normal" type="email" />
                    <TextField label="password" inputRef={passwordref} fullWidth margin="normal" type="password" />
                    <Button variant="contained" color="primary" type="submit"
                        sx={{ marginTop: 2,backgroundColor:"black" }}>
                        submit
                    </Button>
                </Box>
            </form>
        </Modal>
    </>
    );
}
export default Login;