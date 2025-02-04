import { useSelector } from "react-redux";
import { Box, Typography, List, ListItem, ListItemText, Divider, Card, CardContent } from "@mui/material";
import { RootStore } from "./store";
import { useParams } from "react-router-dom";
import { GiCook } from "react-icons/gi";


export default () => {
    const { id } = useParams();
    const recipes = useSelector((state: RootStore) => state.recipes.recipes);
    const recipe = recipes.find(r => r.id == +(id || 1)) || { title: "", description: "", ingredients: [], instructions: "" };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '85vh', paddingTop: '5vh' ,marginRight:"20%"}}>
            <Card sx={{ maxWidth: 1000, width: '95%', padding: 3, boxShadow: 3, borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.7)", maxHeight: '60vh', overflowY: 'auto' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: 'black' }}>
                    <GiCook style={{ marginRight: 8 }} /> {recipe.title}
                    </Typography>

                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        {recipe.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
                        Ingredients:
                    </Typography>
                    <List>
                        {recipe.ingredients.map((ingredient, index) => (
                            <ListItem key={index} sx={{ padding: 0 }}>
                                <ListItemText primary={`✔️ ${ingredient}`} />
                            </ListItem>
                        ))}
                    </List>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
                        Instructions:
                    </Typography>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        {recipe.instructions}
                    </Typography>

                    <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
                        ☕ Appetite! 😊😊
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};