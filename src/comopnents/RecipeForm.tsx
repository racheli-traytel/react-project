import { Button, TextField, Box, Container, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Recipe from "../types/recipeType";
import { useContext } from "react";
import { UserCotext } from "./appLayot";
import Append from "./FormButtons/append";
import Remove from "./FormButtons/remove";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  products: yup.array().of(yup.string().required("Product name is required")).min(1, "At least one product is required"),
  ingredients: yup.array().of(yup.string().required("Ingredient name is required")).min(1, "At least one ingredient is required"),
  instructions: yup.string().required("Instructions are required"),
});

const HookForm = ({ addToList }: { addToList: (data: Recipe) => void }) => {
  const {user, userDispatch} = useContext(UserCotext);
  const {
    formState: { errors }, register, handleSubmit, control,reset,
  } = useForm<Recipe>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "", description: "", products: [""], ingredients: [""],  instructions: "",},
  });

  const { fields: productFields, append: appendProduct, remove: removeProduct } = useFieldArray({
    control,name: "products" as never,});
  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,name: "ingredients" as never,});

  const onSubmit = (data: Recipe) => {
  console.log(data);
  data.authorId=+(user.id)
  addToList(data);
   reset();
   };
  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogTitle>Add New Recipe</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Title" variant="outlined"  fullWidth margin="normal"
            {...register("title")} error={!!errors.title}
            helperText={errors.title?.message} />   
          <TextField
            label="Description" variant="outlined" fullWidth margin="normal"
            {...register("description")} error={!!errors.description}
            helperText={errors.description?.message} />
          <TextField 
           label="Instructions" variant="outlined" fullWidth
            margin="normal" {...register("instructions")}
            error={!!errors.instructions}  helperText={errors.instructions?.message} />
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" gutterBottom> Products </Typography>
            {productFields.map((item, index) => (
              <Box key={item.id} sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                <TextField
                  {...register(`products.${index}` as const)}
                  variant="outlined"  fullWidth
                  margin="normal"  error={!!errors.products?.[index]}
                  helperText={errors.products?.[index]?.message} />
                {index > 0 && (<Remove remove={removeProduct} index={index}></Remove> )}
              </Box>
    ))}
      <Append append={appendProduct}>Add product</Append>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            {ingredientFields.map((item, index) => (
              <Box key={item.id} sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                <TextField
                  {...register(`ingredients.${index}` as const)}
                  variant="outlined"  fullWidth margin="normal"
                  error={!!errors.ingredients?.[index]}
                  helperText={errors.ingredients?.[index]?.message}/>
                {index > 0 && ( <Remove remove={removeIngredient} index={index}></Remove> )}
              </Box>
            ))}
   <Append append={appendIngredient}>Add ingredient</Append>
          </Box>
          <DialogActions>
            <Button type="submit" variant="contained"  style={{backgroundColor:'black'}}>
              Submit Recipe
            </Button>
            <Button onClick={() => reset()} color="secondary">
              Reset
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default HookForm;