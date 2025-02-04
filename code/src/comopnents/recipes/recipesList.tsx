import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "./store";
import { useEffect } from "react";
import { deleteRecipe, fetchRecipes } from "./RecipeSlice";
import { Box, Typography, CircularProgress, Alert, ListItem, IconButton } from "@mui/material";
import Add from "../Add";
import RecipeStyle from "../styles/RecipeStyle";
import { Link, Outlet } from "react-router-dom";
import { FaUtensils } from "react-icons/fa"; 
import Recipe from "../../types/recipeType";
import {Delete} from "@mui/icons-material";

export default () => {
    const dispatch = useDispatch<AppDispatch>();
    const { recipes, loading, error } = useSelector((state: RootStore) => state.recipes);
    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);


    const handleDelete = async (item: Recipe) => {
        await dispatch(deleteRecipe({ recipeId: item.id, userId: item.authorId }));
        await dispatch(fetchRecipes());
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center"
                height="100vh" flexDirection="column">
                <CircularProgress />
                <Typography variant="h6" mt={2}>
                    Loading recipes...
                </Typography>
            </Box>
        );
    }
    if (error) {
        const errorMessage = error && typeof error === "object" && "message" in error
            ? (error as { message: string }).message
            : "An unknown error occurred";
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh"
                flexDirection="column">
                <Alert severity="error">{errorMessage}</Alert>
            </Box>
        );
    }
    return (
        <Box display="flex" flexDirection="row" height="100vh" padding={2} >
            <Box 
                sx={RecipeStyle.recipeBoxStyle} >
                <Typography variant="h6" gutterBottom color="black" sx={{ fontWeight: 'bold' }}>
                    <FaUtensils style={{ marginRight: 8 }} /> Recipes List
                </Typography>
                {recipes.length === 0 ? (
                    <Typography variant="body1">No recipes found.</Typography>
                ) : (
                    recipes.map((r, index) => (
                        <ListItem sx={{
                            textDecoration: "none",
                            "&:hover": { bgcolor: "#9e9e9e", borderRadius: 1 }
                        }}
                            key={index}>
                                
                            <IconButton 
                                sx={{ 
                                    color: 'error.main', 
                                    minWidth: 'auto', 
                                    padding: '6px', 
                                    '&:hover': { 
                                        backgroundColor: 'error.light', 
                                        color: 'white' 
                                    } 
                                }} 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    handleDelete(r); 
                                }}  >
                                <Delete />
                            </IconButton>
                            <Link to={`/recipes/${r.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                {r.title}
                            </Link>                   
                         </ListItem>
                    ))
                )}
            </Box>
            <Box flexGrow={1} padding={2}>
                <Outlet />
            </Box>
            <Add></Add>
        </Box>
    );
};