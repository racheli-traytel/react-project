import { useContext} from "react"
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";

import Update from "./Update";
import { UserCotext } from "./appLayot";
const Loged=()=>
{
    const {user} = useContext(UserCotext);
 
return(
    <>

    <Stack direction="row" spacing={2} alignItems="center">
        <Button onClick={()=>{window.location.href="/"}}>sign out</Button>
        <Avatar sx={{ bgcolor: pink[600] }}>
  {(user.firstName || ' ')[0]}{(user.lastName || ' ')[0]}</Avatar> 
       <Typography variant="body1" sx={{ fontWeight: 600, color: "black" }}>
                {user.firstName} {user.lastName}
            </Typography>
    </Stack>
    <Update></Update>
    </>
)
}
export default Loged



