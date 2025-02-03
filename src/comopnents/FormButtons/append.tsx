import { Button } from "@mui/material"

export default({append,children}:{append: (string:string) => void ,children: React.ReactNode})=>{
    return(<>
     <Button
    type="button"
    variant="contained"
    color="primary"
    sx={{ marginTop: 1,backgroundColor:'black' }}
    onClick={() => append("")}>
      {children}
  </Button>
    </>)  
}


