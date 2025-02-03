import { Button } from "@mui/material"

export default({remove,index}:{remove:(index:number) => void,index:number })=>{
    return (
        <Button
        type="button"
        variant="outlined"
        color="error"
        onClick={() => remove(index)}
        sx={{ marginLeft: 1 }}
      >
        Remove
      </Button>
    )
}