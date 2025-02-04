import { Button } from "@mui/material";
import { useContext, useState } from "react";
import HookForm from "./RecipeForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./recipes/store";
import Recipe from "../types/recipeType";
import { AddRecipes, fetchRecipes } from "./recipes/RecipeSlice";
import {UserCotext } from "./appLayot";

export default () => {

 const [open, setOpen] = useState(false);
 const dispatch = useDispatch<AppDispatch>();
 const {user} = useContext(UserCotext);
 const handleAdd=async(recipe:Recipe)=>
{
  await dispatch(AddRecipes(recipe));
  dispatch(fetchRecipes());
}
    return (
        <>
            { user.id&&<Button 
                variant="contained"  
                color="primary"      
                size="small"      
                onClick={() => setOpen(true)} 
                style={{
                    position: 'fixed',
                    bottom: '20px',    
                    right: '20px',     
                    zIndex: 1000,
                    backgroundColor:'black'      
                }} >
                Add Recipe
            </Button>}
            {open && <HookForm addToList={handleAdd} />}
        </>
    );
};