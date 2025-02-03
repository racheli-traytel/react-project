import { useContext, useState } from "react";
import { Button, Grid, Modal, Box, TextField, } from "@mui/material";
import { url, UserCotext } from "./appLayot";
import axios from "axios";
import User from "../types/User";
import UserStyle from "./styles/UserStyle";

const Update = () => {
    const { user, userDispatch } = useContext(UserCotext);
    const [isLogin, setIsLogin] = useState(false);
    const [open, setOpen] = useState(false);
    const [updatedUser, setUpdatedUser] = useState<User>({
        id: user?.id || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        password: user?.password || '',
        address: user?.address || '',
        phone: user?.phone || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value, }));
    };

    const handleSubmit = async () => {
        setOpen(false);
        setIsLogin(true);
        userDispatch({
            type: "UPDATE",
            data: updatedUser,
        });

        try {
            await axios.put(
                url + "/",
                {
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    address: updatedUser.address,
                    phone: updatedUser.phone,
                },
                {
                    headers: { "user-id": user?.id },
                }
            );
        } catch (e) {
            console.error(e);
            alert("An error occurred while updating user.");
        }
    };

    return (
        <>
            <Grid container>
                <Grid item xs={4}>
                    <Button
                        sx={{ backgroundColor: 'black', color: 'white', margin: '5px' }}
                        variant="contained"
                        onClick={() => setOpen(!open)} >
                        Update
                    </Button>

                </Grid>
            </Grid>
            <Modal open={open} onClose={() => setOpen(false)}>
                <form>
                    <Box sx={UserStyle.updateStyle}>
                        <TextField label="First Name" value={updatedUser.firstName}
                            name="firstName" onChange={handleChange}
                            fullWidth autoComplete="given-name" />
                        <TextField label="Last Name" value={updatedUser.lastName}
                            name="lastName" onChange={handleChange}
                            fullWidth autoComplete="family-name" />
                        <TextField
                            label="Email" value={updatedUser.email}
                            name="email" onChange={handleChange}
                            fullWidth autoComplete="email" />
                        <TextField label="Password" type="password"
                            value={updatedUser.password} name="password"
                            onChange={handleChange} fullWidth />
                        <TextField label="Address" value={updatedUser.address}
                            name="address" onChange={handleChange}
                            fullWidth autoComplete="street-address" />
                        <TextField label="Phone Number"
                            value={updatedUser.phone} name="phone"
                            onChange={handleChange} fullWidth autoComplete="tel" />
                        <Button onClick={handleSubmit} variant="contained" sx={{backgroundColor:"black"}}>
                            Save
                        </Button>
                    </Box>
                </form>
            </Modal>
        </>
    );
};
export default Update;