import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "./store";
import { useEffect } from "react";
import { fetchRecipes } from "./RecipeSlice";
import { Box, Typography, CircularProgress, Alert, ListItem } from "@mui/material";
import Add from "../Add";
import RecipeStyle from "../styles/RecipeStyle";
import { Link, Outlet } from "react-router-dom";
import { FaUtensils } from "react-icons/fa"; 


export default () => {
    const dispatch = useDispatch<AppDispatch>();
    const { recipes, loading, error } = useSelector((state: RootStore) => state.recipes);
    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

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
                            "&:hover": { bgcolor: "#e0e0e0", borderRadius: 1 }
                        }}
                            key={index}>
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